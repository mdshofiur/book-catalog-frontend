'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '@/redux/booksSlice';
import { toast } from 'react-toastify';

interface FormData {
   title: string;
   author: string;
   genre: string;
}

export default function AddNewBook() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm<FormData>();

   const [addBook, { isLoading }] = useAddBookMutation();

   const onSubmit = (data: FormData) => {
      addBook(data)
         .then(() => {
            toast.success('Book added successfully', {
               autoClose: 2000,
            });
            reset();
         })
         .catch((error: any) => {
            toast.error(error.message, {
               autoClose: 2000,
            });
         });
   };

   return (
      <div className='flex flex-col items-center justify-center bg-gray-200 min-h-screen'>
         <h2 className='text-2xl font-semibold mb-4 text-center'>
            Add New Book
         </h2>
         <div className='w-96 mx-auto'>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
               <div className='mb-4'>
                  <label htmlFor='title' className='block text-gray-700'>
                     Title
                  </label>
                  <input
                     type='text'
                     id='title'
                     className={`border-gray-300 border-solid border px-4 py-2 w-full ${
                        errors.title ? 'bg-red-100' : ''
                     }`}
                     placeholder='Enter title'
                     {...register('title', { required: true })}
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
                     className={`border-gray-300 border-solid border px-4 py-2 w-full ${
                        errors.author ? 'bg-red-100' : ''
                     }`}
                     placeholder='Enter author'
                     {...register('author', { required: true })}
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
                     id='genre'
                     className={`border-gray-300 border-solid border px-4 py-2 w-full ${
                        errors.genre ? 'bg-red-100' : ''
                     }`}
                     placeholder='Enter genre'
                     {...register('genre', { required: true })}
                  />
                  {errors.genre && (
                     <span className='text-red-500'>Genre is required</span>
                  )}
               </div>
               <button
                  type='submit'
                  className='flex items-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>
                  Add Book
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
      </div>
   );
}
