import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    validateStoredToken();
  }, []);

  async function validateStoredToken() {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await authService.getCurrentUser();

      setUser(currentUser);

      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  }

  async function login(loginData) {
    const response = await authService.login(loginData);

    saveAuthentication(response);

    return response;
  }

  async function register(registerData) {
    const response = await authService.register(registerData);

    saveAuthentication(response);

    return response;
  }

  function saveAuthentication(response) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    setUser(response.user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
