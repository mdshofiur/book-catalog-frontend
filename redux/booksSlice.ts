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
   tagTypes: ['books'],
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
         invalidatesTags: (result, error, { id }) => [{ type: 'books', id }],
      }),
      deleteBook: builder.mutation<void, string>({
         query: (id) => ({
            url: `/books/book/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: (result, error, { id }: any) => [
            { type: 'books', id },
         ],
      }),
   }),
});

export const { useGetBooksQuery, useAddBookMutation, useDeleteBookMutation } =
   booksApi;
