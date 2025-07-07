import axios from "axios";

// ✅ Hardcode your Render URL directly here for testing
const API = axios.create({
  baseURL: "https://moviemate-beckend.onrender.com/api",
});

// ✅ Attach JWT if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
