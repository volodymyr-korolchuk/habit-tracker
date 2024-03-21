import { Months } from "@/constants/months";

export function getDaysInMonth(year: number, month: number): number {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  return lastDayOfMonth;
}

export const getFormattedDate = (month: Months, index: number): string => {
  const yearPart = new Date().getFullYear();
  const monthPart = `${month + 1}`.padStart(2, "0");
  const dayPart = `${index + 1}`.padStart(2, "0");

  return `${yearPart}-${monthPart}-${dayPart}`;
};
