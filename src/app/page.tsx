"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  ID: string;
  JobTitle: string;
  EmailAddress: string;
  FirstNameLastName: string;
  Email: string;
  Phone: string;
  Company: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const totalPages = 10; // Fixed number of pages

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://give-me-users-forever.vercel.app/api/users/${pageNum}/next`
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageClick = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-[50px] text-white font-semibold justify-center flex items-center">
        Users
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500">
          {" "}
          List
        </span>
      </h1>
      {loading ? (
        <div role="status" className="flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[4%]">
            {users.map((user) => (
              <li key={user.ID} className="bg-[#c4c9d3] p-4 rounded-lg shadow">
                <p>
                  <strong>ID:</strong> {user.ID}
                </p>
                <p>
                  <strong>Job Title:</strong> {user.JobTitle}
                </p>
                <p>
                  <strong>Name:</strong> {user.FirstNameLastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.EmailAddress}
                </p>
                <p>
                  <strong>Phone:</strong> {user.Phone}
                </p>
                <p>
                  <strong>Company:</strong> {user.Company}
                </p>
              </li>
            ))}
          </ul>
          <nav
            aria-label="Page navigation example"
            className="flex justify-center mt-6"
          >
            <ul className="inline-flex -space-x-px text-sm mt-[4%]">
              <li>
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  disabled={page === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageClick(index + 1)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight ${
                      page === index + 1
                        ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
