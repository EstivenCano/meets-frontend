import * as z from "zod";

export type RequestResetPasswordType = z.infer<
  typeof requestResetPasswordSchema
>;

export const requestResetPasswordSchema = z.object({
  email: z.string().email("invalidEmail").min(1, "emailRequired"),
});
