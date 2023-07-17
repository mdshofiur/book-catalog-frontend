'use client';
import React, { useState } from 'react';
import { useGetBooksQuery } from '@/redux/booksSlice';
import Link from 'next/link';

export default function Home() {
   const [searchData, setSearchData] = useState({});
   const { data: books, isLoading } = useGetBooksQuery(searchData);
   return (
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
         {/* Books List */}
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
            {books?.books?.map((book: any, index: number) => (
               <div key={index} className='bg-white rounded-lg shadow-md p-4'>
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
