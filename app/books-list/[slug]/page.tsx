import React from "react";
import Link from "next/link";


const Page = () => {
  return (
    <div className="container mx-auto h-screen py-10">
      <h2 className="text-2xl font-semibold mb-4">Book Details</h2>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">Title</h3>
        <p>Author: </p>
        <p>Genre: </p>
        <p>Publication Date: </p>
      </div>
      <div className="flex justify-between">
        <Link href="/books-list/1/edit-book" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Edit
        </Link>
        <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
          Delete
        </button>
      </div>
      <div className="mt-10">
        {/* render review  */}
        <h4 className="text-lg font-semibold mb-2">Reviews:</h4>
        {/* Render reviews dynamically */}
        <div className="grid grid-cols-8 gap-4 py-5">
          {[1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14].map((item, index) => (
            <div key={index}>
              <p>Review {index}</p>
            </div>
          ))}
        </div>
      </div>
      {/* submit review  */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Submit a Review</h4>
        <form>
          <textarea
            className="border-gray-300 border-solid border px-4 py-2 w-full"
            placeholder="Write your review here..."
          ></textarea>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-4 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
