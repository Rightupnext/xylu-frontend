import axios from "axios";
import { encrypt, decrypt } from "../utils/Crypto";
import { token } from "../auth/index";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5005",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = token.get();
    const originalData = config.data;

    if (originalData && !(originalData instanceof FormData)) {
      config.data = {
        encryptedData: encrypt(originalData),
      };
      config.headers["Content-Type"] = "application/json";
    }

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔓 Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response;

    if (data?.encryptedData) {
      try {
        const decrypted = decrypt(data.encryptedData);
        return Promise.resolve(decrypted);
      } catch (err) {
        return Promise.reject({ message: "Decryption failed", raw: data });
      }
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
