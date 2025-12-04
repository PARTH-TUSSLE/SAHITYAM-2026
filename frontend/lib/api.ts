import axios, { AxiosError, AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

// Error response interface
interface ErrorResponse {
  error?: string;
  code?: string;
  details?: any;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Validate that API URL is set
if (!API_BASE_URL) {
  console.error(
    "FATAL ERROR: NEXT_PUBLIC_API_URL environment variable is not set."
  );
  if (typeof window !== "undefined") {
    toast.error("Configuration error. Please contact support.", {
      duration: 10000,
    });
  }
}

// Request retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Helper function to delay execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to determine if error is retryable
const isRetryableError = (error: AxiosError): boolean => {
  if (!error.response) {
    // Network errors, timeouts, etc.
    return true;
  }

  const status = error.response.status;
  // Retry on 5xx errors and 429 (rate limit)
  return status >= 500 || status === 429;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
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
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _retryCount?: number;
    };

    // Handle network errors
    if (!error.response) {
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        toast.error("Request timeout. Please check your connection.", {
          duration: 5000,
        });
      } else if (error.message === "Network Error") {
        toast.error("Network error. Please check your internet connection.", {
          duration: 5000,
        });
      } else {
        toast.error("Unable to connect to server. Please try again later.", {
          duration: 5000,
        });
      }

      // Retry logic for network errors
      if (
        originalRequest &&
        !originalRequest._retry &&
        isRetryableError(error)
      ) {
        originalRequest._retryCount = originalRequest._retryCount || 0;

        if (originalRequest._retryCount < MAX_RETRIES) {
          originalRequest._retryCount++;
          originalRequest._retry = true;

          console.log(
            `Retrying request (${originalRequest._retryCount}/${MAX_RETRIES})...`
          );

          await delay(RETRY_DELAY * originalRequest._retryCount);
          return apiClient(originalRequest);
        }
      }

      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
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
    }
    // Handle 403 Forbidden
    else if (error.response?.status === 403) {
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
    }
    // Handle 404 Not Found
    else if (error.response?.status === 404) {
      toast.error("The requested resource was not found.", {
        duration: 4000,
      });
    }
    // Handle 429 Too Many Requests (Rate Limiting)
    else if (error.response?.status === 429) {
      toast.error("Too many requests. Please try again later.", {
        duration: 6000,
      });

      // Retry after rate limit with exponential backoff
      if (originalRequest && !originalRequest._retry) {
        originalRequest._retryCount = originalRequest._retryCount || 0;

        if (originalRequest._retryCount < MAX_RETRIES) {
          originalRequest._retryCount++;
          originalRequest._retry = true;

          const retryAfter = error.response.headers["retry-after"];
          const delayTime = retryAfter
            ? parseInt(retryAfter) * 1000
            : RETRY_DELAY * Math.pow(2, originalRequest._retryCount);

          console.log(`Rate limited. Retrying after ${delayTime}ms...`);

          await delay(delayTime);
          return apiClient(originalRequest);
        }
      }
    }
    // Handle 500+ Server Errors
    else if (error.response?.status >= 500) {
      const errorMessage =
        error.response?.data?.error || "Server error. Please try again later.";
      toast.error(errorMessage, {
        duration: 5000,
      });

      // Retry server errors
      if (
        originalRequest &&
        !originalRequest._retry &&
        isRetryableError(error)
      ) {
        originalRequest._retryCount = originalRequest._retryCount || 0;

        if (originalRequest._retryCount < MAX_RETRIES) {
          originalRequest._retryCount++;
          originalRequest._retry = true;

          console.log(
            `Server error. Retrying (${originalRequest._retryCount}/${MAX_RETRIES})...`
          );

          await delay(RETRY_DELAY * Math.pow(2, originalRequest._retryCount));
          return apiClient(originalRequest);
        }
      }
    }
    // Handle 400 Bad Request and other client errors
    else if (error.response?.status >= 400 && error.response?.status < 500) {
      const errorMessage =
        error.response?.data?.error || "Invalid request. Please try again.";

      // Don't show toast for some specific errors that are handled in components
      const silentErrors = ["DUPLICATE_ENTRY", "ALREADY_REGISTERED"];
      const errorCode = error.response?.data?.code;

      if (errorCode && !silentErrors.includes(errorCode)) {
        toast.error(errorMessage, {
          duration: 4000,
        });
      } else if (!errorCode) {
        // Show error if no error code is present
        toast.error(errorMessage, {
          duration: 4000,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
