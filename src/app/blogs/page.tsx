"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import Navbar from "@app/home/sections/Navbar";
import Footer from "@app/home/sections/Footer";
import { PortfolioBlogs } from "@app/models/blogs";
import React, { useEffect, useState } from "react";
import { getHostIcon } from "@app/home/sections/Blogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const itemsPerPage = 6;

function App() {
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<PortfolioBlogs[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get("/api/v1/blogs?public=true");

        const blogData = blogResponse.data.data;
        setBlogs(blogData);
        console.log("the blogs page result is:", blogData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch data.");
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const currentData = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <div className="px-4 sm:px-10 lg:mx-20">
        <Navbar />
      </div>
      <div className="px-4 sm:px-10 lg:mx-60 my-10">
        <h1 className="flex items-center justify-center mb-10 text-5xl font-extrabold text-[#676451]">
          Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentData.map((card, index) => (
            <Link
              key={index}
              href={card.hostLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div key={index} className="w-full">
                {card.blogImage && (
                  <CldImage
                    width="200"
                    height="200"
                    src={card.blogImage}
                    alt={card.blogTitle}
                    className="w-full h-40 sm:h-48 lg:h-52 object-cover rounded-lg"
                    priority
                  />
                )}

                <div className="mt-4">
                  <div className="flex space-x-2 text-gray-500 text-xs">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {card.publishDate}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {card.avgReadTime}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {getHostIcon(card.hostSource)}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mt-1">{card.avgReadTime}</h3>
                  <p className="text-sm text-gray-700 mt-2">
                    {card.blogDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded-lg ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-black"
            }`}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`px-3 py-1 border border-gray-300 rounded-lg ${
                currentPage === page + 1
                  ? "bg-gray-200 border-gray-400"
                  : "border-gray-300"
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-gray-300 rounded-lg ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-black"
            }`}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
