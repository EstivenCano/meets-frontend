import * as z from "zod";

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, "passwordRequired").min(8, "passwordLength8"),
    confirmPassword: z
      .string()
      .min(1, "confirmPasswordRequired")
      .min(8, "confirmPasswordLength8"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwordsDoNotMatch",
    path: ["confirmPassword"],
  });
