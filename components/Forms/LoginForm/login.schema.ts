import * as z from "zod";

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().email("invalidEmail").min(1, "emailRequired"),
  password: z.string().min(1, "passwordRequired").min(8, "passwordLength8"),
});
