'use client';
import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Puff } from 'react-loader-spinner';
import { useGetBooksQuery } from '@/redux/booksSlice';

const Page = () => {
   const [searchData, setSearchData] = useState({});

   const { register, handleSubmit } = useForm();
   const { data: books, isLoading } = useGetBooksQuery(searchData);

   const onSubmit = (data: any) => {
      setSearchData(data);
   };

   return (
      <Fragment>
         <div className='container mx-auto min-h-screen py-10'>
            <h2 className='text-2xl font-semibold mb-4'>All Books</h2>
            <div className='flex justify-between items-center mb-10'>
               <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <input
                        type='text'
                        placeholder='Search by title'
                        {...register('title')}
                        className='p-2'
                     />
                     <select {...register('genre')} className='p-2 ml-4'>
                        <option value=''>All Genres</option>
                        {/* Render genre options dynamically */}
                        <option value='Horror'>Horror</option>
                        <option value='Funny'>Funny</option>
                     </select>
                     <select
                        {...register('publicationYear')}
                        className='p-2 ml-4'>
                        <option value=''>All Publication Years</option>
                        {/* Render publication year options dynamically */}
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                        <option value='2023'>2023</option>
                     </select>
                     <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-semibold p-2 px-4 rounded ml-4'>
                        Search
                     </button>
                  </form>
               </div>
               <Link
                  href='/add-book'
                  className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>
                  Add Book
               </Link>
            </div>
            {/* Books List */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
               {books?.books?.map((book: any, index: number) => (
                  <div
                     key={index}
                     className='bg-white rounded-lg shadow-md p-4'>
                     <Link
                        href={`/books-list/${book._id}`}
                        className='text-xl font-semibold hover:text-gray-500 mb-2'>
                        {book?.title}
                     </Link>
                     <p>Author: {book?.author}</p>
                     <p>Genre: {book?.genre}</p>
                     <p>Publication Date: {book?.publicationDate}</p>
                  </div>
               ))}
            </div>
            {/* Not Found Message */}
            {!books?.books?.length && !isLoading && (
               <h2 className='text-2xl font-semibold mb-4 text-center'>
                  No Books Found
               </h2>
            )}
         </div>
         {/* Loading Spinner */}
         {isLoading && (
            <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50'>
               <Puff
                  height='80'
                  width='80'
                  radius={1}
                  color='#4fa94d'
                  ariaLabel='puff-loading'
                  visible={true}
               />
            </div>
         )}
      </Fragment>
   );
};

export default Page;
