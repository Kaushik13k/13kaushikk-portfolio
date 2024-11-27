"use client";
import Image from "next/image";
import React, { useState } from "react";
import gtaImage from "@app/assets/gta5.jpg";
import Navbar from "@app/home/sections/Navbar";
import Footer from "@app/home/sections/Footer";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const cardsData = [
  {
    title: "Unveiling the Secrets Beyond the Tourist Trails",
    description:
      "Dive into the local culture, discover hidden spots, and experience the authentic charm...",
    date: "30 Jan 2024",
    readTime: "10 mins read",
    imgSrc: gtaImage,
  },
  {
    title: "A Fashionista's Guide to Wanderlust",
    description:
      "Explore the intersection of fashion and travel as we delve into the wardrobes of...",
    date: "30 Jan 2024",
    readTime: "10 mins read",
    imgSrc: gtaImage,
  },
  {
    title: "Top 5 Apps and Gadgets That Will Transform Your Journeys",
    description:
      "Explore the latest in travel technology with our guide to must-have apps and gadgets...",
    date: "30 Jan 2024",
    readTime: "10 mins read",
    imgSrc: gtaImage,
  },
  {
    title: "GTA V: A Thrilling Ride Through Los Santos",
    description:
      "Join us as we explore the highs and lows of Rockstar's iconic open-world adventure...",
    date: "29 Jan 2024",
    readTime: "5 mins read",
    imgSrc: gtaImage,
  },
  {
    title: "Exploring the Hidden Gem of Europe",
    description:
      "Discover the picturesque destinations that are off the beaten path...",
    date: "31 Jan 2024",
    readTime: "8 mins read",
    imgSrc: gtaImage,
  },
  {
    title: "Ultimate Guide to Travel Photography",
    description:
      "Get the best tips on how to capture beautiful moments while you travel...",
    date: "25 Jan 2024",
    readTime: "12 mins read",
    imgSrc: gtaImage,
  },
  {
    title: "Best Food Destinations Around the World",
    description:
      "Taste your way through different cultures with our top culinary destinations...",
    date: "28 Jan 2024",
    readTime: "15 mins read",
    imgSrc: gtaImage,
  },
];

const itemsPerPage = 6;

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cardsData.length / itemsPerPage);

  const currentData = cardsData.slice(
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
            <div key={index} className="w-full">
              <Image
                src={card.imgSrc}
                alt="card image"
                className="w-full h-40 sm:h-48 lg:h-52 object-cover rounded-lg"
              />
              <div className="mt-4">
                <div className="flex space-x-2 text-gray-500 text-xs">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {card.date}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {card.readTime}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon
                      icon={faMedium}
                      className="text-gray-700"
                    />
                  </span>
                </div>
                <h3 className="font-bold text-lg mt-1">{card.title}</h3>
                <p className="text-sm text-gray-700 mt-2">{card.description}</p>
              </div>
            </div>
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
