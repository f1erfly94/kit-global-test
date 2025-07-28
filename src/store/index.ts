import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './slices/postsSlice';
import commentsSlice from './slices/commentsSlice';
import filtersSlice from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    comments: commentsSlice,
    filters: filtersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['posts/createPost/fulfilled', 'posts/updatePost/fulfilled'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
