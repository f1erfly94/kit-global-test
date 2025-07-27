import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, CreatePostData, PostsState } from '@/types';
import { FirebaseService } from '@/lib/firebase';

const initialState: PostsState = {
    items: [],
    currentPost: null,
    loading: false,
    error: null,
};

// Async thunks
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const posts = await FirebaseService.getPosts();
            return posts;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch posts');
        }
    }
);

export const fetchPost = createAsyncThunk(
    'posts/fetchPost',
    async (id: string, { rejectWithValue }) => {
        try {
            const post = await FirebaseService.getPost(id);
            if (!post) {
                return rejectWithValue('Post not found');
            }
            return post;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch post');
        }
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData: CreatePostData, { rejectWithValue }) => {
        try {
            const postId = await FirebaseService.createPost(postData);
            const newPost = await FirebaseService.getPost(postId);
            return newPost;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to create post');
        }
    }
);

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({ id, updates }: { id: string; updates: Partial<CreatePostData> }, { rejectWithValue }) => {
        try {
            await FirebaseService.updatePost(id, updates);
            const updatedPost = await FirebaseService.getPost(id);
            return updatedPost;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update post');
        }
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id: string, { rejectWithValue }) => {
        try {
            await FirebaseService.deletePost(id);
            return id;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete post');
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearCurrentPost: (state) => {
            state.currentPost = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch single post
            .addCase(fetchPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPost = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create post
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.items.unshift(action.payload);
                }
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update post
            .addCase(updatePost.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.items.findIndex(post => post.id === action.payload!.id);
                    if (index !== -1) {
                        state.items[index] = action.payload;
                    }
                    if (state.currentPost?.id === action.payload.id) {
                        state.currentPost = action.payload;
                    }
                }
            })
            // Delete post
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter(post => post.id !== action.payload);
                if (state.currentPost?.id === action.payload) {
                    state.currentPost = null;
                }
            });
    },
});

export const { clearCurrentPost, clearError } = postsSlice.actions;
export default postsSlice.reducer;