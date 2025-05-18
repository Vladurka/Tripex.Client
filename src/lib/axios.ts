import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://localhost:5050/api",
  withCredentials: true,
});
