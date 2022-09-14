import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import questionReducer from '../features/question/questionSlice';

export const store = configureStore({
  reducer: {
    allQuestions: questionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
