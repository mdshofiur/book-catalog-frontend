'use client';
import React, { useState } from 'react';
import { useGetBooksQuery } from '@/redux/booksSlice';
import Link from 'next/link';

const Home = () => {
   const [searchData, setSearchData] = useState({});
   const { data: books, isLoading } = useGetBooksQuery(searchData);
   return (
      <main className='container mx-auto grid justify-center min-h-screen  py-10'>
         <h1 className='text-4xl text-center pt-5 pb-12 underline underline-offset-4'> Islamic books</h1>
         {/* Books List */}
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
            {books?.books?.slice(0, 10).map((book: any, index: number) => (
               <div
                  key={index}
                  className='bg-white rounded-lg shadow-md p-4 h-auto'>
                  <Link
                     href={`/books-list/${book._id}`}
                     className='text-xl font-semibold hover:text-gray-500 mb-2'>
                     {book?.title}
                  </Link>
                  <p>Author: {book?.author}</p>
                  <p>Genre: {book?.genre}</p>
                  <p className='mb-5'>
                     Publication Date: {book?.publicationDate}
                  </p>
                  <Link
                     href={`/books-list/${book._id}`}
                     className='bg-blue-500 hover:bg-blue-700 text-white font-semibold p-2 px-4 rounded'>
                     Details
                  </Link>
               </div>
            ))}
         </div>
         {/* Not Found Message */}
         {!books?.books?.length && !isLoading && (
            <h2 className='text-2xl font-semibold mb-4 text-center'>
               No Books Found
            </h2>
         )}
      </main>
   );
}

export default Home;

