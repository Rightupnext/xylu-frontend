// // src/auth/token.js
// import { jwtDecode } from "jwt-decode";

// const TOKEN_KEY = "xylu-token"; // ✅ Correct key name

// export const token = {
//   set: (value) => localStorage.setItem(TOKEN_KEY, value),

//   get: () => localStorage.getItem(TOKEN_KEY),

//   remove: () => localStorage.removeItem(TOKEN_KEY),

//   isValid: () => {
//     const storedToken = localStorage.getItem(TOKEN_KEY);
//     if (!storedToken) return false;

//     try {
//       const decoded = jwtDecode(storedToken);
//       const currentTime = Date.now() / 1000;
//       return decoded.exp ? decoded.exp > currentTime : true;
//     } catch (e) {
//       return false;
//     }
//   },

//   getUser: () => {
//     const storedToken = localStorage.getItem(TOKEN_KEY);
//     if (!storedToken) return null;

//     try {
//       return jwtDecode(storedToken); // Returns { id, email, role, etc. }
//     } catch {
//       return null;
//     }
//   },
// };
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "xylu-token";
const USER_KEY = "xylu-user"; // optional, used if you store user info separately

export const token = {
  set: (value) => localStorage.setItem(TOKEN_KEY, value),

  get: () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) return null;

    try {
      const decoded = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        token.remove(); // token expired, remove it
        return null;
      }

      return storedToken;
    } catch (e) {
      token.remove(); // malformed token
      return null;
    }
  },

  remove: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY); // if you store user separately
  },

  isValid: () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) return false;

    try {
      const decoded = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        token.remove();
        return false;
      }

      return true;
    } catch {
      token.remove();
      return false;
    }
  },

  getUser: () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) return null;

    try {
      const decoded = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        token.remove();
        return null;
      }

      return decoded; // { id, email, role, ... }
    } catch {
      token.remove();
      return null;
    }
  },
};
