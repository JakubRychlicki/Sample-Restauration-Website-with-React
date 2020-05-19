export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.isEmail) {
    // eslint-disable-next-line
    const pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
