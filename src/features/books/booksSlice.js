import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  status: 'idle',
  error: null,
  sortBy: 'title',
  order: 'asc',
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const res = await axios.get(
    'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YOUR_API_KEY'
  );
  return res.data.results.books;
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSortBy, setOrder } = booksSlice.actions;

export default booksSlice.reducer;
