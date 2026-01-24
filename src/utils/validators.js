export const validators = {
  isEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  },

  isNotEmpty(value) {
    return value && value.trim().length > 0;
  },

  minLength(value, length) {
    return value.trim().length >= length;
  },
};
