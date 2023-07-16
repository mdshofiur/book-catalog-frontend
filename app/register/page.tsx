"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authConfig } from '@/firebase/firebase-auth';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function Register() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { email, password, firstName, lastName } = data;
      const userCredential = await createUserWithEmailAndPassword(authConfig, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      router.push('/')
    } catch (error) {
      console.log("error", error);
      toast.error("user already register!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-64">
      <input
          type="text"
          placeholder="First Name"
          {...register("firstName", { required: true })}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.firstName && <span className="text-red-500">First Name is required</span>}
        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: true })}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.lastName && <span className="text-red-500">Last Name is required</span>}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && <span className="text-red-500">Email is required</span>}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && <span className="text-red-500">Password is required</span>}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Register
        </button>
      </form>
    </div>
  );
}
