import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Book {
   [x: string]: any;
   id?: any;
   title: string;
   author: string;
   genre: string;
}

export const booksApi = createApi({
   reducerPath: 'booksApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'https://book-catalog-backend-seven.vercel.app/api' }),
   tagTypes: ['Books'],
   endpoints: (builder) => ({
      getBooks: builder.query<Book, any>({
         query: (queryParams) => `books?${new URLSearchParams(queryParams)}`,
         providesTags: (result) =>
            result ? [{ type: 'Books', id: result.id }] : [],
      }),
      getBook: builder.query<Book, any>({
         query: (id) => `/books/${id}`,
         providesTags: (result) =>
            result ? [{ type: 'Books', id: result.id }] : [],
      }),
      addBook: builder.mutation<void, Partial<Book>>({
         query: (body) => ({
            url: '/books',
            method: 'POST',
            body,
         }),
         invalidatesTags: (result, error, { id }) => [{ type: 'Books', id }],
      }),
      deleteBook: builder.mutation<void, string>({
         query: (id) => ({
            url: `/books/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: (result, error, { id }: any) => [
            { type: 'Books', id },
         ],
      }),
      updateBook: builder.mutation<void, Partial<Book>>({
         query: ({ id, ...patch }) => ({
            url: `/books/${id}`,
            method: 'PUT',
            body: patch,
         }),
         invalidatesTags: (result, error, { id }: any) => [
            { type: 'Books', id },
         ],
      }),
      updateReview: builder.mutation<void, Partial<Book>>({
         query: ({ id, ...patch }) => ({
            url: `/books/${id}/reviews`,
            method: 'PUT',
            body: patch,
         }),
         invalidatesTags: (result, error, { id }: any) => [
            { type: 'Books', id },
         ],
      }),
   }),
});

export const {
   useGetBooksQuery,
   useGetBookQuery,
   useAddBookMutation,
   useDeleteBookMutation,
   useUpdateBookMutation,
   useUpdateReviewMutation
} = booksApi;
