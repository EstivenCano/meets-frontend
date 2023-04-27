import * as z from "zod";

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(40, "Name is too long, max 40 characters"),
  bio: z.string().max(35, "Bio is too long, max 35 characters"),
  picture: z.string().url("Invalid URL"),
  cover: z.string().url("Invalid URL"),
});
