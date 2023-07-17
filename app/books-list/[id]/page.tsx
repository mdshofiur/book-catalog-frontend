import React from 'react';
import { BookEditDelete } from '@/components/book-edit-delete';
import { Review } from '@/components/Review';

export const fetchCache = 'force-no-store';

async function getBook(id: number) {
   const res = await fetch(`https://book-catalog-backend-rho.vercel.app/api/books/book/${id}`, {
      cache: 'no-store',
   });
   const book = await res.json();
   return book;
}

const Page = async ({ params }: { params: { id: number } }) => {
   const { id } = params;
   const bookData = await getBook(id);

   return (
      <div className='container mx-auto min-h-screen py-10'>
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

            {bookData?.book?.reviews.length === 0 ? (
               <p className='text-gary-500 text-base text-center py-5'>
                  No reviews yet
               </p>
            ) : (
               <div className='grid grid-cols-5 gap-4 py-5'>
                  {bookData?.book?.reviews?.map((item: any, index: number) => (
                     <div key={index} className='border p-5 rounded'>
                        <p className='text-gary-500 text-base'>{item}</p>
                     </div>
                  ))}
               </div>
            )}
         </div>
         {/* submit review  */}
         <Review id={bookData?.book?._id} />
      </div>
   );
};

export default Page;
