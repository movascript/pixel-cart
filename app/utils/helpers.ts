export const formatPrice = (price: number, currency: string = "$"): string => {
  return `${currency}${price.toFixed(2)}`;
};

// simulating network latency
export function simulateApiDelay(min = 40, max = 500) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

const PERSIAN_DIGITS = [
  "۰",
  "۱",
  "۲",
  "۳",
  "۴",
  "۵",
  "۶",
  "۷",
  "۸",
  "۹",
] as const;

export function toPersianDigits(value: string | number): string {
  return String(value).replace(
    /\d/g,
    (digit) => PERSIAN_DIGITS[Number(digit)]!,
  );
}
