"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import apiClient from "@/lib/api";
import {
  User,
  setToken,
  getToken,
  setUser,
  getUser,
  clearAuth,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    username: string,
    email: string,
    password: string,
    mobileNumber: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const token = getToken();
      const savedUser = getUser();

      if (token && savedUser) {
        // Validate token structure (basic check)
        if (token.split(".").length === 3) {
          setUserState(savedUser);
        } else {
          console.warn("Invalid token format, clearing auth data");
          clearAuth();
        }
      }
    } catch (error) {
      console.error("Error loading user from storage:", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const response = await apiClient.post("/auth/login", { email, password });
      const { user: userData, token } = response.data;

      if (!userData || !token) {
        throw new Error("Invalid response from server");
      }

      setToken(token);
      setUser(userData);
      setUserState(userData);
    } catch (error: any) {
      console.error("Login error:", error);

      // Extract meaningful error message
      let errorMessage = "Login failed. Please try again.";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  };

  const register = async (
    name: string,
    username: string,
    email: string,
    password: string,
    mobileNumber: string
  ): Promise<void> => {
    try {
      // Validate inputs
      if (!name || !username || !email || !password || !mobileNumber) {
        throw new Error("All fields are required");
      }

      const response = await apiClient.post("/auth/register", {
        name,
        username,
        email,
        password,
        mobileNumber,
      });
      const { user: userData, token } = response.data;

      if (!userData || !token) {
        throw new Error("Invalid response from server");
      }

      setToken(token);
      setUser(userData);
      setUserState(userData);
    } catch (error: any) {
      console.error("Registration error:", error);

      // Extract meaningful error message
      let errorMessage = "Registration failed. Please try again.";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  };

  const logout = (): void => {
    clearAuth();
    setUserState(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
