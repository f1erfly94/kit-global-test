import { z } from 'zod';

export const createCommentSchema = z.object({
  postId: z.string().min(1, 'Post ID is required'),

  author: z
    .string()
    .min(2, 'Author name must be at least 2 characters long')
    .max(50, 'Author name must not exceed 50 characters')
    .trim(),

  content: z
    .string()
    .min(5, 'Comment must be at least 5 characters long')
    .max(500, 'Comment must not exceed 500 characters')
    .trim(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
