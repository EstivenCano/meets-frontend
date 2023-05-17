import * as z from "zod";

export type NewMessageType = z.infer<typeof newMessageSchema>;

export const newMessageSchema = z.object({
  content: z.string().min(1, "contentRequired"),
});
