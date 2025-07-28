import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),

  content: z
    .string()
    .min(10, 'Content must be at least 10 characters long')
    .max(5000, 'Content must not exceed 5000 characters')
    .trim(),

  author: z
    .string()
    .min(2, 'Author name must be at least 2 characters long')
    .max(50, 'Author name must not exceed 50 characters')
    .trim(),

  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters long')
    .max(200, 'Excerpt must not exceed 200 characters')
    .trim(),

  tags: z
    .array(z.string().trim())
    .max(5, 'Maximum number of tags is 5')
    .refine(
      (tags) => tags.every((tag) => tag.length >= 2 && tag.length <= 20),
      'Each tag must be between 2 and 20 characters long',
    ),
});

export const updatePostSchema = z.object({
  id: z.string().min(1, 'Post ID is required'),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must not exceed 100 characters')
    .trim()
    .optional(),

  content: z
    .string()
    .min(10, 'Content must be at least 10 characters long')
    .max(5000, 'Content must not exceed 5000 characters')
    .trim()
    .optional(),

  author: z
    .string()
    .min(2, 'Author name must be at least 2 characters long')
    .max(50, 'Author name must not exceed 50 characters')
    .trim()
    .optional(),

  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters long')
    .max(200, 'Excerpt must not exceed 200 characters')
    .trim()
    .optional(),

  tags: z
    .array(z.string().trim())
    .max(5, 'Maximum number of tags is 5')
    .refine(
      (tags) => tags.every((tag) => tag.length >= 2 && tag.length <= 20),
      'Each tag must be between 2 and 20 characters long',
    )
    .optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
