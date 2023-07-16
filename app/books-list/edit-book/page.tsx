"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormValues = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
};

export default function EditBook() {
  const router = useRouter();
  //   const { bookId } = router.query;
  const bookId = 1;

  // Mock data for current book
  const book = {
    title: "Book Title",
    author: "Author Name",
    genre: "Genre",
    publicationDate: "Publication Date",
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    setValue("title", book.title);
    setValue("author", book.author);
    setValue("genre", book.genre);
    setValue("publicationDate", book.publicationDate);
  }, [setValue, book.author, book.genre, book.publicationDate, book.title]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Perform API request to update the book with data

    // Mock API request with a delay
    setTimeout(() => {
      alert("Book updated successfully");
      router.push(`/books/${bookId}`);
    }, 2000);
  };

  return (
    <div className="container mx-auto py-10 h-screen">
      <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="border-gray-300 border-solid border px-4 py-2 w-full"
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
            {...register("author", { required: true })}
            className="border-gray-300 border-solid border px-4 py-2 w-full"
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
            type="text"
            id="genre"
            {...register("genre", { required: true })}
            className="border-gray-300 border-solid border px-4 py-2 w-full"
          />
          {errors.genre && (
            <span className="text-red-500">Genre is required</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="publicationDate" className="block text-gray-700">
            Publication Date
          </label>
          <input
            type="text"
            id="publicationDate"
            {...register("publicationDate", { required: true })}
            className="border-gray-300 border-solid border px-4 py-2 w-full"
          />
          {errors.publicationDate && (
            <span className="text-red-500">Publication Date is required</span>
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
  );
}
