import * as z from "zod";

export type NewCommentType = z.infer<typeof newCommentSchema>;

export const newCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(320, "Content is too long"),
});
