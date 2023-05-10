import * as z from "zod";

export type DeletUserSchemaType = z.infer<typeof deleteUserSchema>;

export const deleteUserSchema = z.object({
  password: z.string().min(1, "passwordRequired").min(8, "passwordLength8"),
});
