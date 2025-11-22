export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt?: string;
}

export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export const setUser = (user: User): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
};

export const removeUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

export const clearAuth = (): void => {
  removeToken();
  removeUser();
};
