import React from "react";
import Link from "next/link";


const Page = () => {
  return (
    <div className="container mx-auto min-h-screen py-10">
      <h2 className="text-2xl font-semibold mb-4">All Books</h2>
      <div className="flex justify-between items-center mb-10">
        <div>
          <input
            type="text"
            placeholder="Search by title, author, or genre"
            className="border-gray-300 border-solid border px-4 py-2 mr-2"
          />
          <select
            defaultValue=""
            className="border-gray-300 border-solid border px-4 py-2 mr-2"
          >
            <option value="">All Genres</option>
            {/* Render genre options dynamically */}
            <option value="genre1">Genre 1</option>
            <option value="genre2">Genre 2</option>
          </select>
          <select
            defaultValue=""
            className="border-gray-300 border-solid border px-4 py-2"
          >
            <option value="">All Publication Years</option>
            {/* Render publication year options dynamically */}
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2022">2023</option>
          </select>
        </div>
        <Link
          href="/add-book"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Book
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Render book data dynamically */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <Link href="/books-list/1" className="text-xl font-semibold hover:text-gray-500 mb-2">Book Title</Link>
            <p>Author: Author Name</p>
            <p>Genre: Genre</p>
            <p>Publication Date: Publication Date</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
