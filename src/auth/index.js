// src/auth/token.js
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "xylu-token"; // ✅ Correct key name

export const token = {
  set: (value) => localStorage.setItem(TOKEN_KEY, value),

  get: () => localStorage.getItem(TOKEN_KEY),

  remove: () => localStorage.removeItem(TOKEN_KEY),

  isValid: () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) return false;

    try {
      const decoded = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;
      return decoded.exp ? decoded.exp > currentTime : true;
    } catch (e) {
      return false;
    }
  },

  getUser: () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) return null;

    try {
      return jwtDecode(storedToken); // Returns { id, email, role, etc. }
    } catch {
      return null;
    }
  },
};
