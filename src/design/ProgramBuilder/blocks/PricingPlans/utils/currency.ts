export type CurrencyCode = "EUR" | "USD" | "GBP" | "UAH";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  EUR: {
    code: "EUR",
    symbol: "€",
    label: "EUR (€)",
  },
  USD: {
    code: "USD",
    symbol: "$",
    label: "USD ($)",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    label: "GBP (£)",
  },
  UAH: {
    code: "UAH",
    symbol: "₴",
    label: "UAH (₴)",
  },
};

/**
 * Get currency info by currency code
 */
export const getCurrencyInfo = (code: CurrencyCode): CurrencyInfo => {
  return CURRENCIES[code];
};

/**
 * Get currency symbol by currency code
 */
export const getCurrencySymbol = (code: CurrencyCode): string => {
  return CURRENCIES[code].symbol;
};

/**
 * Format price with currency symbol
 */
export const formatPrice = (
  price: number | undefined,
  currencyCode: CurrencyCode,
  options?: {
    showCode?: boolean;
    locale?: string;
  }
): string => {
  if (price === undefined || price === null) return "—";

  const { symbol } = getCurrencyInfo(currencyCode);
  const { showCode = false, locale = "uk-UA" } = options || {};

  // Format number with locale-specific separators
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  // For UAH and EUR, symbol goes after the number
  // For USD and GBP, symbol goes before
  const priceText =
    currencyCode === "USD" || currencyCode === "GBP"
      ? `${symbol}${formattedNumber}`
      : `${formattedNumber}${symbol}`;

  return showCode ? `${priceText} ${currencyCode}` : priceText;
};

/**
 * Calculate discount percentage
 */
export const calculateDiscountPercentage = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (originalPrice <= 0 || discountedPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};
