interface ValidateLoginFormProps {
  username: string;
  password: string;
}

interface ValidateSugnupFormProps {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])(?!.* ).{8,16}$/;

const isValidEmail = (email: string) => {
  return new RegExp(EMAIL_REGEX).test(email);
};

const isValidPassword = (password: string) => {
  return new RegExp(PASSWORD_REGEX).test(password);
};

export const validateLoginForm = (props: ValidateLoginFormProps) => {
  const fields = Object.entries(props);

  // Values presence check
  for (const entry of fields) {
    const fieldName = capitalize(entry[0]);
    const fieldValue = entry[1];

    if (fieldValue.length < 1) {
      return {
        valid: false,
        message: `${fieldName} is required`,
      };
    }
  }

  return { valid: true, message: "" };
};

export const validateSignupForm = (props: ValidateSugnupFormProps) => {
  const { password, confirmPassword } = props;

  const fields = Object.entries(props);

  // Values presence check
  for (const entry of fields) {
    const fieldName = capitalize(entry[0]);
    const fieldValue = entry[1];

    if (fieldValue.length < 1) {
      return {
        valid: false,
        message: `${fieldName} is required`,
      };
    }
  }

  if (!isValidPassword(password)) {
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

const capitalize = (rawName: string) =>
  rawName[0].toUpperCase() + rawName.substring(1);
