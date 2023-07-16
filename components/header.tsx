"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authConfig } from "@/firebase/firebase-auth";
import { User } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
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
      toast.success("Logout success!", {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Logout failed!", {
        autoClose: 2000,
      });
    }
  };

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold">bookcatalog</h1>
        </div>
        <nav className="flex items-center gap-4 ">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/add-book" className="text-gray-300 hover:text-white">
            Add Book
          </Link>
          {currentUser ? (
            <>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
              <h1 className="text-gray-30">
                {currentUser.displayName}
              </h1>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white">
                Log In
              </Link>
              <Link href="/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
