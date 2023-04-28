import * as z from "zod";

export type NewPostType = z.infer<typeof newPostSchema>;

export const newPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(30, "Title must be less than 30 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(320, "Content must be less than 320 characters"),
  publish: z.boolean().optional(),
});
