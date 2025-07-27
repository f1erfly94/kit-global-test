
export interface BlogComment {
    id: string;
    postId: string;
    content: string;
    author: string;
    createdAt: string;
}

export interface CreateBlogCommentData {
    postId: string;
    author: string;
    content: string;
}

export interface BlogCommentsState {
    items: BlogComment[];
    loading: boolean;
    error: string | null;
}
