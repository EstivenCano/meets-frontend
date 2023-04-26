import * as z from "zod";

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const signupSchema = z
  .object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    name: z.string().min(1, "Name is required").max(40, "Name is too long"),
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
