export interface Message {
  id?: number;
  createdAt: string;
  updatedAt?: string;
  content: string;
  authorId: number;
  chatId?: number;
}
