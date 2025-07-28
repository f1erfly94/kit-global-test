import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BlogComment, CreateBlogCommentData, BlogCommentsState } from '@/types';
import { FirebaseService } from '@/lib/firebase';

const initialState: BlogCommentsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: string, { rejectWithValue }) => {
    try {
      const comments = await FirebaseService.getCommentsByPost(postId);
      return comments;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch comments');
    }
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData: CreateBlogCommentData, { rejectWithValue }) => {
    try {
      const commentId = await FirebaseService.createComment(commentData);
      const comments = await FirebaseService.getCommentsByPost(commentData.postId);
      const newComment = comments.find((c) => c.id === commentId);

      if (!newComment) {
        throw new Error('Failed to retrieve created comment');
      }

      return newComment;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create comment');
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id: string, { rejectWithValue }) => {
    try {
      await FirebaseService.deleteComment(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete comment');
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.items = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<BlogComment[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action: PayloadAction<BlogComment | undefined>) => {
        state.loading = false;
        if (action.payload) {
          state.items.unshift(action.payload);
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.items = state.items.filter((comment) => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearComments, clearError: clearCommentsError } = commentsSlice.actions;
export default commentsSlice.reducer;
