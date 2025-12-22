/**
 * Shared formatting utilities for the Lumina Market application.
 */

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2
});

/**
 * Formats a numeric value into a USD currency string.
 */
export const formatCurrency = (value: number): string => {
  return currencyFormatter.format(value);
};

/**
 * Ensures a value stays within a specified numeric range.
 */
export const clampNumber = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Formats a rating to a single decimal point, suitable for display.
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};