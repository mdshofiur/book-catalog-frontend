'use client';
import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '@/redux/booksSlice';

const Page = () => {
   const dispatch = useDispatch();
   const { register, handleSubmit } = useForm();
   const books = useSelector((state: any) => state.books.books);
   const loading = useSelector((state: any) => state.books.loading);
   const error = useSelector((state: any) => state.books.error);

   const onSubmit = (data) => {
      dispatch(fetchBooks(data));
   };

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>Error: {error}</div>;
  }
  
  console.log('books', books);

   return (
      <div className='container mx-auto min-h-screen py-10'>
         <h2 className='text-2xl font-semibold mb-4'>All Books</h2>
         <div className='flex justify-between items-center mb-10'>
            <div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                     type='text'
                     placeholder='Search by title, author, or genre'
                     {...register('query')}
                  />
                  <select {...register('genre')}>
                     <option value=''>All Genres</option>
                     {/* Render genre options dynamically */}
                     <option value='genre1'>Genre 1</option>
                     <option value='genre2'>Genre 2</option>
                  </select>
                  <select {...register('publicationYear')}>
                     <option value=''>All Publication Years</option>
                     {/* Render publication year options dynamically */}
                     <option value='2021'>2021</option>
                     <option value='2022'>2022</option>
                     <option value='2023'>2023</option>
                  </select>
                  <button type='submit'>Search</button>
               </form>
            </div>
            <Link
               href='/add-book'
               className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>
               Add Book
            </Link>
         </div>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
            {books.map((book) => (
               <div key={book.id} className='bg-white rounded-lg shadow-md p-4'>
                  <Link
                     href={`/books-list/${book.id}`}
                     className='text-xl font-semibold hover:text-gray-500 mb-2'>
                     {book.title}
                  </Link>
                  <p>Author: {book.author}</p>
                  <p>Genre: {book.genre}</p>
                  <p>Publication Date: {book.publicationDate}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Page;
