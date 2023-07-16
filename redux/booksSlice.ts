import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks } from './getSlice';

export const fetchBooks = createAsyncThunk<any, any, any>(
   'books/fetchBooks',
   async (queryParams: any, thunkAPI) => {
      try {
         const response = await getBooks(queryParams ?? null);
         return response;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.message);
      }
   },
);

const booksSlice = createSlice({
   name: 'books',
   initialState: {
      books: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchBooks.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchBooks.fulfilled, (state, action) => {
            state.books = action.payload;
            state.loading = false;
            state.error = null;
         })
         .addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false;
            state.error = null;
         });
   },
});

export default booksSlice.reducer;
