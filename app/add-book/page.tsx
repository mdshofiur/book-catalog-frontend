"use client";
import React from "react";
import { useForm } from "react-hook-form";

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
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle form submission and show notifications
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Book</h2>
      <div className="w-96 mx-auto">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              className={`border-gray-300 border-solid border px-4 py-2 w-full ${
                errors.title ? "bg-red-100" : ""
              }`}
              placeholder="Enter title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700">
              Author
            </label>
            <input
              type="text"
              id="author"
              className={`border-gray-300 border-solid border px-4 py-2 w-full ${
                errors.author ? "bg-red-100" : ""
              }`}
              placeholder="Enter author"
              {...register("author", { required: true })}
            />
            {errors.author && (
              <span className="text-red-500">Author is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="block text-gray-700">
              Genre
            </label>
            <input
              id="genre"
              className={`border-gray-300 border-solid border px-4 py-2 w-full ${
                errors.genre ? "bg-red-100" : ""
              }`}
              placeholder="Enter genre"
              {...register("genre", { required: true })}
            />
            {errors.genre && (
              <span className="text-red-500">Genre is required</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
