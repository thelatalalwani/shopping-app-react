import { apiClient } from "./apiClient";

async function register(registerData) {
  return apiClient.post("/Auth/register", registerData);
}

async function login(loginData) {
  return apiClient.post("/Auth/login", loginData);
}

async function getCurrentUser() {
  return apiClient.get("/Auth/me");
}

export const authService = {
  register,
  login,
  getCurrentUser,
};
