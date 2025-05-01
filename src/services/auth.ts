import { apiFetch } from "@/utils/fetch";
import { LoginResponse, RegisterResponse, VerifyResponse } from "./type";

export async function login(email: string, password: string) {
  return apiFetch<LoginResponse>(`/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}
export async function register(email: string, password: string, phone: string) {
  return apiFetch<RegisterResponse>(`/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, phone }),
  });
}
export async function emailAvailability(email: string) {
  return apiFetch<VerifyResponse>(`/auth/check-email?email=${email}`);
}

export async function verify2FA(code: string) {
  return apiFetch<VerifyResponse>(`/auth/verify-2fa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
}
export async function checkAuthStatus(token: string | null) {
  return apiFetch<VerifyResponse>(`/auth/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
