import axios from "axios";

export const pistonAxios = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

pistonAxios.interceptors.response.use(
  (responce) => responce.data,
  (error) => {
    return Promise.reject(
      error.response?.data || error.message,
    );
  },
);
