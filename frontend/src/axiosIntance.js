// axiosInstance.js
import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";
const baseURL = isLocalhost
  ? "http://localhost:8085/api"
  : "http://192.168.43.58:8085/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
