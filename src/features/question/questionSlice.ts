import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { AppThunk, RootState } from "../../app/store";
import { saveQuestion } from "./api/questionAPI";

export const initialState: IQuestionState = {
  questions: [
    {
      id: uuidv4(),
      question: "How to add a question?",
      answer: "Just use the form below",
      saveDelay: false
    }
  ]
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, { payload }: PayloadAction<IQuestion>) => {
      state.questions = [...state.questions, payload];
    },
    removeQuestion: (state, { payload }: PayloadAction<IQuestion>) => {
      const filteredQuestion = state.questions.filter(question => question.id !== payload.id);
      state.questions = filteredQuestion;
    },
    removeAllQuestions: state => {
      state.questions = [];
    },
    sortQuestions: state => {
      const sortedQuestions = state.questions.sort((a, b) =>
        a.question.toLowerCase().localeCompare(b.question.toLowerCase())
      );

      state.questions = sortedQuestions;
    },
    editQuestion: (state, { payload }: PayloadAction<IQuestion>) => {
      const editedQuestions = state.questions.map(question => (question.id === payload.id ? payload : question));
      state.questions = editedQuestions;
    }
  },
  extraReducers: builder => {
    builder.addCase(addQuestionAsync.fulfilled, (state, { payload }) => {
      state.questions = [...state.questions, payload];
    });
  }
});

export const { addQuestion, removeQuestion, removeAllQuestions, sortQuestions, editQuestion } = questionSlice.actions;

export const selectQuestions = (state: RootState) => state.allQuestions.questions;

export const addQuestionAsync = createAsyncThunk("question/saveQuestion", async (question: IQuestion) => {
  const response = await saveQuestion(question);

  return response.data;
});

export const addQuestionIfDelay =
  (question: IQuestion): AppThunk =>
  (dispatch, getState) => {
    if (question.saveDelay) {
      dispatch(addQuestionAsync(question));
    } else {
      dispatch(addQuestion(question));
    }
  };

export default questionSlice.reducer;
