import * as z from "zod";

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(1, "nameRequired").max(40, "nameLength40"),
  bio: z.string().max(35, "bioLength35"),
  picture: z.string().url("invalidUrl"),
  cover: z.string().url("invalidUrl"),
});
