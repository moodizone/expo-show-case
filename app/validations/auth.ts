import { z } from "zod";

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email format");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const phoneSchema = z
  .string()
  .min(3, "Phone number is required")
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format");

export const twoFACodeSchema = z
  .string()
  .min(1, "Verification code is required")
  .regex(/^\d{6}$/, "Verification code must be 6 digits");

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
  twoFACode: twoFACodeSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
