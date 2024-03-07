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
