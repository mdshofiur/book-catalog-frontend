import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface BookEditDeleteProps {
   bookData: any;
}

export const BookEditDelete = ({ bookData }: BookEditDeleteProps) => {
   return (
      <div className='flex justify-between'>
         <Link
            href={`/books-list/${bookData?.book?._id}/edit-book`}
            className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>
            Edit
         </Link>
         <button className='bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded'>
            Delete
         </button>
      </div>
   );
};
