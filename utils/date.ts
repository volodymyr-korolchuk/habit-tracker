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

/**
 * @param year
 * Current year
 * @param month
 * Specified in range 0-11 (January, December)
 * @param day
 * Specified in range 1-31
 * @returns
 * ISO Date string that represents midnight of the specified date
 */
export const getFormattedISODateString = (
  year: number,
  month: number,
  day: number
) => {
  const currentDate = new Date(year, month, day);
  currentDate.setHours(0, 0, 0, 0);

  const utcMidnight = new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
  );

  return utcMidnight.toISOString();
};
