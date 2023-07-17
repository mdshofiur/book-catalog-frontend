'use client';

import React, { useEffect, Fragment } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { useGetBookQuery, useUpdateBookMutation } from '@/redux/booksSlice';
import { Puff } from 'react-loader-spinner';
import { toast } from 'react-toastify';

type FormValues = {
   title: string;
   author: string;
   genre: string;
};

export default function EditBook() {
   const router = useRouter();
   const params = useParams();
   const bookId = params.id;
   // get book by id
   const { data, isLoading } = useGetBookQuery(bookId);

   const [updateBook, { isLoading: loading }] = useUpdateBookMutation();

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<FormValues>();


   useEffect(() => {
      if (data?.book) {
         setValue('title', data.book.title, { shouldDirty: true });
         setValue('author', data.book.author, { shouldDirty: true });
         setValue('genre', data.book.genre, { shouldDirty: true });
      }
   }, [data, setValue]);

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      await updateBook({ id: bookId, ...data });
      toast.success('Book updated successfully', {
         autoClose: 1000,
      });
      router.push('/books-list');
   };

   return (
      <Fragment>
         <div className='container mx-auto py-10 h-screen'>
            <h2 className='text-2xl font-semibold mb-4'>Edit Book</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='mb-4'>
                  <label htmlFor='title' className='block text-gray-700'>
                     Title
                  </label>
                  <input
                     type='text'
                     id='title'
                     {...register('title', { required: true })}
                     className='border-gray-300 border-solid border px-4 py-2 w-full'
                  />
                  {errors.title && (
                     <span className='text-red-500'>Title is required</span>
                  )}
               </div>
               <div className='mb-4'>
                  <label htmlFor='author' className='block text-gray-700'>
                     Author
                  </label>
                  <input
                     type='text'
                     id='author'
                     {...register('author', { required: true })}
                     className='border-gray-300 border-solid border px-4 py-2 w-full'
                  />
                  {errors.author && (
                     <span className='text-red-500'>Author is required</span>
                  )}
               </div>
               <div className='mb-4'>
                  <label htmlFor='genre' className='block text-gray-700'>
                     Genre
                  </label>
                  <input
                     type='text'
                     id='genre'
                     {...register('genre', { required: true })}
                     className='border-gray-300 border-solid border px-4 py-2 w-full'
                  />
                  {errors.genre && (
                     <span className='text-red-500'>Genre is required</span>
                  )}
               </div>
               <button
                  type='submit'
                  className='flex items-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>
                  Edit Now
                  {loading && (
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
}
