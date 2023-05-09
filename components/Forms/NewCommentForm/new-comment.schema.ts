import * as z from "zod";

export type NewCommentType = z.infer<typeof newCommentSchema>;

export const newCommentSchema = z.object({
  content: z.string().min(1, "contentRequired").max(320, "contentLength320"),
});
