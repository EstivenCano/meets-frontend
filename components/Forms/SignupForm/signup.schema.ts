import * as z from "zod";

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const signupSchema = z
  .object({
    email: z.string().email("invalidEmail").min(1, "emailRequired"),
    name: z.string().min(1, "nameRequired").max(40, "nameToLong"),
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
