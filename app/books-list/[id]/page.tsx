import React from 'react';
import Link from 'next/link';
import { BookEditDelete } from '@/components/book-edit-delete';

async function getBook(id: number) {
   const res = await fetch(`http://localhost:2000/api/books/book/${id}`);
   const book = await res.json();
   return book;
}

const Page = async ({ params }: { params: { id: number } }) => {
   const { id } = params;
   const bookData = await getBook(id);

   return (
      <div className='container mx-auto h-screen py-10'>
         <h2 className='text-2xl font-semibold mb-4'>Book Details</h2>
         <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
            <h3 className='text-xl font-semibold mb-2'>
               {bookData?.book?.title}
            </h3>
            <p>Author: {bookData?.book?.author}</p>
            <p>Genre: {bookData?.book?.genre}</p>
            <p>Publication Date: {bookData?.book?.publicationDate}</p>
         </div>
         <BookEditDelete bookData={bookData} />
         <div className='mt-10'>
            {/* render review  */}
            <h4 className='text-lg font-semibold mb-2'>Reviews:</h4>
            {/* Render reviews dynamically */}
            <div className='grid grid-cols-8 gap-4 py-5'>
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                  (item, index) => (
                     <div key={index}>
                        <p>Review {index}</p>
                     </div>
                  ),
               )}
            </div>
         </div>
         {/* submit review  */}
         <div className='mt-6'>
            <h4 className='text-lg font-semibold mb-2'>Submit a Review</h4>
            <form>
               <textarea
                  className='border-gray-300 border-solid border px-4 py-2 w-full'
                  placeholder='Write your review here...'></textarea>
               <button className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-4 rounded'>
                  Submit
               </button>
            </form>
         </div>
      </div>
   );
};

export default Page;
