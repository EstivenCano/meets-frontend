import * as z from "zod";

export type NewPostType = z.infer<typeof newPostSchema>;

export const newPostSchema = z.object({
  title: z.string().min(1, "titleRequired").max(30, "titleLength30"),
  content: z.string().min(1, "contentRequired").max(320, "contentLength320"),
  publish: z.boolean().optional(),
});
