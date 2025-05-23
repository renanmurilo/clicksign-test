import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APPWRITE_ENDPOINT,
  headers: {
    "X-Appwrite-Project": import.meta.env.VITE_APPWRITE_PROJECT_ID!,
    "Content-Type": "application/json",
  },
});

export default api;
