// (?=.*[a-z])    at least one lower case letter exists
// (?=.*[A-Z])    at least one upper case letter exists
// (?=.*\d)       at least one digit exists
// (?=.*\W])      at least one non-word character exists

export const formValidation = {
  minLength: 8,
  maxLength: 45,
  passwordRegex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
};
