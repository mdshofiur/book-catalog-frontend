'use client';
import React from 'react';
import Link from 'next/link';
import useAuthentication from '@/hook/useAuthentication';

const Header = () => {
   const { currentUser, handleLogout } = useAuthentication();

   return (
      <header className='bg-gray-900 text-white py-4'>
         <div className='container mx-auto flex justify-between items-center'>
            <div className='flex items-center'>
               <Link
                  href='/'
                  className='text-lg font-semibold uppercase  first-line:tracking-widest'>
                  bookcatalog
               </Link>
            </div>
            <nav className='flex items-center gap-4 '>
               <Link href='/' className='text-gray-300 hover:text-white'>
                  Home
               </Link>

               <Link
                  href='/books-list'
                  className='text-gray-300 hover:text-white'>
                  Books List
               </Link>
               {currentUser ? (
                  <>
                     <Link
                        href='/add-book'
                        className='text-gray-300 hover:text-white'>
                        Add Book
                     </Link>
                     <button
                        onClick={handleLogout}
                        className='text-gray-300 hover:text-white'>
                        Logout
                     </button>
                     <h1 className='text-gray-30'>{currentUser.displayName}</h1>
                  </>
               ) : (
                  <>
                     <Link
                        href='/login'
                        className='text-gray-300 hover:text-white'>
                        Sign In
                     </Link>
                     <Link
                        href='/register'
                        className='text-gray-300 hover:text-white'>
                        Sign Up
                     </Link>
                  </>
               )}
            </nav>
         </div>
      </header>
   );
};

export default Header;
