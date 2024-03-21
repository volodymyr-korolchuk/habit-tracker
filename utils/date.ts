import { Months } from "@/constants/months";

export function getDaysInMonth(year: number, month: number): number {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  return lastDayOfMonth;
}

/**
 * @param month
 * Specified in range 0-11 (January, December)
 * @param day
 * Specified in range 1-31
 * @returns
 */
export const getLocalDateString = (month: Months, day: number): string => {
  return new Date(new Date().getFullYear(), month, day).toLocaleDateString();
};
