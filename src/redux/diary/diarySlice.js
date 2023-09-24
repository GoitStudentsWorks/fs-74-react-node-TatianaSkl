import { createSlice } from '@reduxjs/toolkit';
import { getDataProducts, getDataExercises, deleteProduct, deleteExercise } from './operations';

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  exercises: [],
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleFullfield = state => {
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, payload) => {
  state.isLoading = false;
  state.error = payload.error;
};

const diary = createSlice({
  name: 'diary',
  initialState,
  extraReducers: builder => {
    builder.addCase(getDataProducts.pending, handlePending);
    builder.addCase(getDataProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.products = payload;
    });
    builder.addCase(getDataProducts.rejected, handleRejected);
    builder.addCase(getDataExercises.pending, handlePending);
    builder.addCase(getDataExercises.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.exercises = payload;
    });
    builder.addCase(getDataExercises.rejected, handleRejected);

    builder.addCase(deleteProduct.pending, handlePending);
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      handleFullfield(state);
      const newProductsList = state.products.filter(product => product._id !== payload);
      state.products = newProductsList;
    });
    builder.addCase(deleteProduct.rejected, handleRejected);

    builder.addCase(deleteExercise.pending, handlePending);
    builder.addCase(deleteExercise.fulfilled, (state, { payload }) => {
      handleFullfield(state);
      const newExercisesList = state.exercises.filter(exercise => exercise._id !== payload);
      state.exercises = newExercisesList;
    });
    builder.addCase(deleteExercise.rejected, handleRejected);
  },
});

export const diaryReducer = diary.reducer;