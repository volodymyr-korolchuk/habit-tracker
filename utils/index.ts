import { Months } from "@/constants/months";

export const getGretting = () => {
  const time = new Date().getHours();

  if (time >= 0 && time < 11) {
    return "Good morning! 😎";
  } else if (time >= 11 && time < 18) {
    return "Hi there! 👋";
  } else {
    return "Good Evening! 🌜";
  }
};

export const getFormattedDate = (month: Months, index: number): string => {
  const yearPart = new Date().getFullYear();
  const monthPart = `${month + 1}`.padStart(2, "0");
  const dayPart = `${index + 1}`.padStart(2, "0");

  return `${yearPart}-${monthPart}-${dayPart}`;
};
