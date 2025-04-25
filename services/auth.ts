import { create } from "zustand";

export async function login(email: string, password: string) {
  const response = await fetch(`/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function register(email: string, password: string, phone: string) {
  const response = await fetch(`/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, phone }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
}

export async function checkEmailAvailability(email: string) {
  const response = await fetch(`/auth/check-email?email=${email}`);

  if (!response.ok) {
    throw new Error("Email check failed");
  }

  const data = await response.json();
  return data.available;
}

export async function verify2FA(code: string) {
  const response = await fetch(`/auth/verify-2fa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error("2FA verification failed");
  }

  return response.json();
}

export async function checkAuthStatus(token: string | null) {
  const response = await fetch(`/auth/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Auth status check failed");
  }

  return response.json();
}
