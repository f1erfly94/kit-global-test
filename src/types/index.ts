import {Post} from "@/types/post";

export * from './post';
export * from './comment';

export interface FilterState {
    searchTerm: string;
    author: string;
    sortBy: 'newest' | 'oldest' | 'title';
}

export interface AppState {
    posts: PostsState;
    comments: CommentsState;
    filters: FilterState;
    loading: boolean;
    error: string | null;
}

export interface PostsState {
    items: Post[];
    currentPost: Post | null;
    loading: boolean;
    error: string | null;
}
export interface Comment {
    id: string;
    postId: string;
    content: string;
    author: string;
    createdAt: string;
}

export interface CommentsState {
    items: Comment[];
    loading: boolean;
    error: string | null;
}