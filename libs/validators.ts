import toast from "react-hot-toast";

export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])(?!.* ).{8,16}$/;

export const validateEmail = (email: string) => {
  return new RegExp(EMAIL_REGEX).test(email);
};
export const validatePassword = (password: string) => {
  return new RegExp(PASSWORD_REGEX).test(password);
};

export const validateLoginForm = (username: string, password: string) => {
  if (username.length < 1) {
    return { valid: false, message: "Username is required" };
  }

  if (password.length < 1) {
    return { valid: false, message: "Password is required" };
  }

  return { valid: true, message: "" };
};

export const validateSignupForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (username.length < 1) {
    return { valid: false, message: "Username is required" };
  }

  if (password.length < 1) {
    return { valid: false, message: "Password is required" };
  }

  if (email.length < 1) {
    return { valid: false, message: "Email is required" };
  }

  if (confirmPassword.length < 1) {
    return { valid: false, message: "Confrim your password" };
  }

  if (!validateEmail(email)) {
    return { valid: false, message: "Email is not valid" };
  }

  if (!validatePassword(password)) {
    return {
      valid: false,
      message:
        "Password must be 8 or more characters long and contain at least one letter and one number",
    };
  }

  if (password !== confirmPassword) {
    return { valid: false, message: "Passwords do not match" };
  }

  return { valid: true, message: "" };
};
