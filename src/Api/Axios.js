import axios from "axios";

// Create an Axios instance with your Render backend URL as the base URL
const API_URL = "https://amazon-api-deploy-vrwl.onrender.com"; // Render backend URL

const axiosInstance = axios.create({
  baseURL: API_URL, // This will be prepended to all the API requests
  headers: {
    "Content-Type": "application/json",
  },
});

// You can also set up interceptors here if needed, for example, to handle authentication tokens, etc.

export default axiosInstance;
