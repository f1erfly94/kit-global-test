import {z} from "zod";

export const createCommentSchema = z.object({
    postId: z.string().min(1, 'ID поста обязателен'),

    author: z.string()
        .min(2, 'Имя автора должно содержать минимум 2 символа')
        .max(50, 'Имя автора не должно превышать 50 символов')
        .trim(),

    content: z.string()
        .min(5, 'Комментарий должен содержать минимум 5 символов')
        .max(500, 'Комментарий не должен превышать 500 символов')
        .trim()
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;

