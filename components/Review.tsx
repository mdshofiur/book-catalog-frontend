'use client';
import useAuthentication from '@/hook/useAuthentication';
import { useUpdateReviewMutation } from '@/redux/booksSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

export const Review = ({ id }: any) => {
   const { currentUser } = useAuthentication();
   const [updateReview, { isLoading }] = useUpdateReviewMutation();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<any>();

   const onSubmit: SubmitHandler<any> = async (data) => {
      const newReview = { reviews: data.review };
      try {
         await updateReview({ id, ...newReview });
         setTimeout(() => {
            toast.success('Review successfully added', {
               autoClose: 1000,
            });
         }, 1000);
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
            <button
               disabled={!currentUser}
               type='submit'
               className={`flex items-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-4 rounded ${
                  !currentUser && 'cursor-not-allowed opacity-50'
               }`}>
               Review
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
         </form>
      </div>
   );
};
