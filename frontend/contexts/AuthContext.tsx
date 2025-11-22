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
    password: string
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
    const token = getToken();
    const savedUser = getUser();

    if (token && savedUser) {
      setUserState(savedUser);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { user: userData, token } = response.data;

      setToken(token);
      setUser(userData);
      setUserState(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const register = async (
    name: string,
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await apiClient.post("/auth/register", {
        name,
        username,
        email,
        password,
      });
      const { user: userData, token } = response.data;

      setToken(token);
      setUser(userData);
      setUserState(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Registration failed");
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
