export function getDaysInMonth(year: number, month: number): number {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  return lastDayOfMonth;
}
