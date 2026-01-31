export const validators = {
  isEmail(value = "") {
    if (typeof value !== "string") return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  },

  isNotEmpty(value = "") {
    if (typeof value !== "string") return false;
    return value.trim().length > 0;
  },

  minLength(value = "", length = 1) {
    if (typeof value !== "string") return false;
    return value.trim().length >= length;
  },
};
