'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en' suppressHydrationWarning={true}>
         <body className={inter.className}>
            <Provider store={store}>
               <Header />
               <ToastContainer position='bottom-right' />
               {children}
               <Footer />
            </Provider>
         </body>
      </html>
   );
}
