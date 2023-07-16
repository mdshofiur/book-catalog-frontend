import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto min-h-screen pt-10">
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
            {/* <option value="genre1">Genre 1</option> */}
            {/* <option value="genre2">Genre 2</option> */}
          </select>
          <select
            defaultValue=""
            className="border-gray-300 border-solid border px-4 py-2"
          >
            <option value="">All Publication Years</option>
            {/* Render publication year options dynamically */}
            {/* <option value="2021">2021</option> */}
            {/* <option value="2022">2022</option> */}
          </select>
        </div>
        <Link href="/add-book"  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Add Book
          </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Publication Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Render book data dynamically */}
          {/* <tr>
        <td>Book Title</td>
        <td>Author Name</td>
        <td>Genre</td>
        <td>Publication Date</td>
      </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
