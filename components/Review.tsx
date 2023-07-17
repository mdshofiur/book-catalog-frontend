'use client';

import { useUpdateBookMutation } from '@/redux/booksSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

export const Review = ({ id }: any) => {
   const [updateBook] = useUpdateBookMutation();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<any>();

   const onSubmit: SubmitHandler<any> = async (data) => {
      const newReview = { review: data.review }; 

      try {
         await updateBook({ id, ...newReview });
         toast.success('Review successfully added', {
            autoClose: 1000,
         });
         reset();
      } catch (error) {
         console.error('Error updating book:', error);
         toast.error('Failed to add review');
      }
   };

   return (
      <div className='mt-6'>
         <h4 className='text-lg font-semibold mb-2'>Submit a Review</h4>
         <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
               {...register('review', { required: true })}
               className='border-gray-300 border-solid border px-4 py-2 w-full'
               placeholder='Write your review here...'></textarea>
            {errors.review && (
               <span className='text-red-500'>This field is required</span>
            )}
            <button className='flex items-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-4 rounded'>
               Review
            </button>
         </form>
      </div>
   );
};
