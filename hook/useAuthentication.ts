import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { authConfig } from '@/firebase/firebase-auth';
import { User } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const useAuthentication = () => {
   const router = useRouter();

   const [currentUser, setCurrentUser] = useState<User | null>(null);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(authConfig, (user) => {
         if (user) {
            setCurrentUser(user);
         } else {
            setCurrentUser(null);
         }
      });

      return () => unsubscribe();
   }, []);

   const handleLogout = async () => {
      try {
         await signOut(authConfig);
         setCurrentUser(null);
         toast.success('Logout success!', {
            autoClose: 1000,
         });
         router.push('/');
      } catch (error) {
         toast.error('Logout failed!', {
            autoClose: 1000,
         });
      }
   };

   return { currentUser, handleLogout };
};

export default useAuthentication;
