export const storage = {
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Storage save error:", err);
    }
  },

  load(key, fallback = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (err) {
      console.error("Storage load error:", err);
      return fallback;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Storage remove error:", err);
    }
  },
};
