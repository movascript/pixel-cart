# cloud.ps1
# Usage:
#   cloud deploy      -> build, upload, and deploy the app
#   cloud rollback     -> rollback to the last backup

param(
    [Parameter(Position = 0, Mandatory = $false)]
    [string]$Action
)

# Validate action manually so we can show a clean usage message
if (-not $Action -or ($Action -ne "deploy" -and $Action -ne "rollback")) {
    Write-Host ""
    Write-Host "  cloud.ps1 - Deployment tool" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Usage:" -ForegroundColor Yellow
    Write-Host "    cloud deploy        build, upload, and deploy the app"
    Write-Host "    cloud rollback      rollback to the last backup"
    Write-Host ""
    Write-Host "  ERROR: first argument must be 'deploy' or 'rollback'" -ForegroundColor Red
    Write-Host ""
    exit 1
}

# Load .env
$envFile = Join-Path $PSScriptRoot ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "ERROR: .env not found in $PSScriptRoot" -ForegroundColor Red
    Write-Host "       Create a .env file with DEPLOY_HOST_USER and DEPLOY_HOST_IP" -ForegroundColor Red
    exit 1
}

Get-Content $envFile | ForEach-Object {
    if ($_ -match "^\s*#" -or $_ -match "^\s*$") { return }
    $parts = $_ -split "=", 2
    if ($parts.Length -eq 2) {
        Set-Item -Path "Env:$($parts[0].Trim())" -Value $parts[1].Trim()
    }
}

$HOST_USER = $env:DEPLOY_HOST_USER
$HOST_IP   = $env:DEPLOY_HOST_IP

if (-not $HOST_USER -or -not $HOST_IP) {
    Write-Host "ERROR: DEPLOY_HOST_USER or DEPLOY_HOST_IP missing in .env" -ForegroundColor Red
    exit 1
}

$SSH = "${HOST_USER}@${HOST_IP}"

# Logging helpers

function Step($msg)    { Write-Host "  >> $msg" -ForegroundColor Gray }
function Ok($msg)      { Write-Host "  OK $msg" -ForegroundColor Green }
function Fail($msg)    { Write-Host "  FAIL $msg" -ForegroundColor Red }
function Section($msg) { Write-Host "`n=== $msg ===" -ForegroundColor Cyan }

# Runners

function Run-Remote($label, $cmd) {
    Step $label
    $output = ssh $SSH $cmd 2>&1
    if ($LASTEXITCODE -ne 0) {
        Fail $label
        Write-Host $output -ForegroundColor DarkRed
        throw "Remote step failed: $label"
    }
    Ok $label
}

function Run-Local($label, $scriptBlock) {
    Step $label
    try {
        & $scriptBlock
        if ($LASTEXITCODE -ne 0) { throw "Exit code $LASTEXITCODE" }
        Ok $label
    } catch {
        Fail $label
        Write-Host "  $_" -ForegroundColor DarkRed
        throw
    }
}

# Actions

function Deploy-App {
    Section "Deploy Pixelcart"

    Run-Local "Build app" {
        pnpm run build
    }

    Run-Local "Upload .output to server" {
        scp -r .output "${SSH}:/tmp/output"
    }

    Run-Remote "Backup current app" `
        "sudo cp -r /var/www/pixelcart /var/backups/pixelcart/backup-`$(date +%Y%m%d-%H%M%S)"

    Run-Remote "Clear web root" `
        "sudo rm -rf /var/www/pixelcart/*"

    Run-Remote "Copy new build to web root" `
        "sudo cp -r /tmp/output/* /var/www/pixelcart"

    Run-Remote "Clean up temp files" `
        "sudo rm -rf /tmp/output"

    Run-Remote "Restart pm2" `
        "pm2 restart all"
}

function Rollback-App {
    Section "Rollback Pixelcart"

    Run-Remote "Restore last backup" `
        "sudo cp -r `$(ls -td /var/backups/pixelcart/backup-* | head -1)/* /var/www/pixelcart/"

    Run-Remote "Restart pm2" `
        "pm2 restart all"
}

# Main

Write-Host "cloud $Action -- target: $SSH" -ForegroundColor DarkGray

try {
    if ($Action -eq "deploy") {
        Deploy-App
    } else {
        Rollback-App
    }

    Write-Host "`nAll steps completed successfully." -ForegroundColor Green

} catch {
    Write-Host "`nAborted -- fix the error above and retry." -ForegroundColor Red
    exit 1
}