import * as z from "zod";

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required")
      .min(8, "Confirm Password must have more than 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
