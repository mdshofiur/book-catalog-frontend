'use client';
import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useDeleteBookMutation } from '@/redux/booksSlice';
import { useRouter } from 'next/navigation';

interface BookEditDeleteProps {
   bookData: any;
}

export const BookEditDelete = ({ bookData }: BookEditDeleteProps) => {
   const router = useRouter();

   const [deleteBook, { isLoading }] = useDeleteBookMutation();

   const onSubmit = (id: any) => {
      deleteBook(id)
         .then(() => {
            toast.success('Book deleted successfully', {
               autoClose: 2000,
            });
            router.push('/');
         })
         .catch((error: any) => {
            toast.error(error.message, {
               autoClose: 2000,
            });
         });
   };

   return (
      <div className='flex justify-between'>
         <Link
            href={`/books-list/${bookData?.book?._id}/edit-book`}
            className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>
            Edit
         </Link>
         <button
            onClick={() => onSubmit(bookData?.book?._id)}
            className='flex items-center gap-3 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded'>
            Delete
            {isLoading && (
               <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <circle
                     className='opacity-25'
                     cx='12'
                     cy='12'
                     r='10'
                     stroke='currentColor'
                     strokeWidth='4'></circle>
                  <path
                     className='opacity-75'
                     fill='currentColor'
                     d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'></path>
               </svg>
            )}
         </button>
      </div>
   );
};
