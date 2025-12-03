import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Validate that API URL is set
if (!API_BASE_URL) {
  throw new Error(
    "FATAL ERROR: NEXT_PUBLIC_API_URL environment variable is not set. " +
      "Please create a .env.local file with NEXT_PUBLIC_API_URL=your_backend_url"
  );
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to requests
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const errorCode = error.response?.data?.code;

      // Token expired or invalid
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Show user-friendly message based on error code
        if (errorCode === "TOKEN_EXPIRED") {
          toast.error("Your session has expired. Please login again.", {
            duration: 5000,
          });
        } else {
          toast.error("Authentication required. Please login.", {
            duration: 4000,
          });
        }

        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    } else if (error.response?.status === 403) {
      const errorCode = error.response?.data?.code;

      if (errorCode === "INSUFFICIENT_PERMISSIONS") {
        toast.error("You don't have permission to access this resource.", {
          duration: 5000,
        });
        if (typeof window !== "undefined") {
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        }
      }
    } else if (error.response?.status === 429) {
      toast.error("Too many requests. Please try again later.", {
        duration: 6000,
      });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
