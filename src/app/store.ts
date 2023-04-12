import { configureStore } from '@reduxjs/toolkit';
import cellReducer from '../components/Cells/cellsSlice';

// import { cellsApi } from './api/cells.api';

export const store = configureStore({
  reducer: {
    cells: cellReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(cellsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
