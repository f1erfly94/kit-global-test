export namespace Blog {
    export interface Comment {
        id: string;
        postId: string;
        content: string;
        author: string;
        createdAt: string;
    }

    export interface CreateCommentData {
        postId: string;
        author: string;
        content: string;
    }

    export interface CommentsState {
        items: Comment[];
        loading: boolean;
        error: string | null;
    }
}