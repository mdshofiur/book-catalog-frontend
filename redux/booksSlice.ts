import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
   reducerPath: 'booksApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:2000/api' }), // Replace with your actual API base URL
   endpoints: (builder) => ({
      getBooks: builder.query({
         query: (queryParams) => `books?${new URLSearchParams(queryParams)}`,
      }),
   }),
});

export const { useGetBooksQuery } = booksApi;
