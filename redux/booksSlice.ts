import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
}

export const booksApi = createApi({
   reducerPath: 'booksApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:2000/api' }),
   tagTypes: ['Post'],
   endpoints: (builder) => ({
      getBooks: builder.query({
         query: (queryParams) => `books?${new URLSearchParams(queryParams)}`,
      }),
      addBook: builder.mutation<void, Partial<Book>>({
         query: (body) => ({
            url: '/books',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Post'],
      }),
   }),
});

export const { useGetBooksQuery, useAddBookMutation } = booksApi;
