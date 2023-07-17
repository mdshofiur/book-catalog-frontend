'use client';
import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useDeleteBookMutation } from '@/redux/booksSlice';
import { useRouter } from 'next/navigation';
import { confirmAlert } from 'react-confirm-alert';
import useAuthentication from '@/hook/useAuthentication';

interface BookEditDeleteProps {
   bookData: any;
}

export const BookEditDelete = ({ bookData }: BookEditDeleteProps) => {
   const router = useRouter();
   const { currentUser } = useAuthentication();
   const [deleteBook, { isLoading }] = useDeleteBookMutation();

   const onSubmit = (id: any) => {
      deleteBook(id)
         .then(() => {
            toast.success('Book deleted successfully', {
               autoClose: 2000,
            });
            setTimeout(() => {
               router.push('/books-list');
            }, 1000);
         })
         .catch((error: any) => {
            toast.error(error.message, {
               autoClose: 2000,
            });
         });
   };

   const submit = (id: any) => {
      confirmAlert({
         message: 'Are you sure to do this?',
         buttons: [
            {
               label: 'Yes',
               onClick: () => onSubmit(id),
            },
            {
               label: 'No',
            },
         ],
      });
   };

   const unauthenticatedMessage = () => {
      toast.error('You must be logged in to do this', {
         autoClose: 2000,
      });
   };

   return (
      <div className='flex justify-between'>
         {currentUser ? (
            <Link
               href={`/books-list/${bookData?.book?._id}/edit-book`}
               className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>
               Edit
            </Link>
         ) : (
            <button
               onClick={unauthenticatedMessage}
               className='bg-blue-500 text-white font-semibold py-2 px-4 rounded cursor-not-allowed opacity-50'>
               Edit
            </button>
         )}
         <button
            onClick={() =>
               currentUser
                  ? submit(bookData?.book?._id)
                  : unauthenticatedMessage()
            }
            className={`flex items-center gap-3 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded ${
               !currentUser && 'cursor-not-allowed opacity-50'
            }`}>
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
