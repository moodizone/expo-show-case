import { z } from "zod";

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const emailSchema = z.string().email("Invalid email format");
export const nameSchema = z.string().min(3);
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[0-9]/, "Password must contain at least one number");

export const phoneSchema = z
  .string()
  .min(3, "Phone number is required")
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format");

export const twoFACodeSchema = z
  .string()
  .min(1, "Verification code is required")
  .regex(/^\d{4}$/, "Verification code must be 4 digits");

export const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    phone: phoneSchema,
    twoFACode: twoFACodeSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
