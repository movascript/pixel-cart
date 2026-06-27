<template>
  <NuxtLoadingIndicator color="#e20054" :height="2" />
  <div class="min-h-screen flex flex-col">
    <LayoutHeader />
    <main class="flex flex-col grow">
      <NuxtPage />
    </main>
    <LayoutFooter />
  </div>
</template>
