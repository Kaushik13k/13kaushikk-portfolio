import React from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { PortfolioBlogs } from "@/app/models/blogs";
import { faMedium, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CldImage } from "next-cloudinary";

const truncateDescription = (description: string) => {
  if (description.length > 125) {
    return description.slice(0, 125) + "...";
  }
  return description;
};

export const getHostIcon = (hostSource: string) => {
  switch (hostSource.toLowerCase()) {
    case "medium":
      return <FontAwesomeIcon icon={faMedium} className="text-gray-700" />;
    case "linkedin":
      return <FontAwesomeIcon icon={faLinkedinIn} className="text-gray-700" />;
    default:
      return null;
  }
};

const Blogs = ({ portfolioBlogs }: { portfolioBlogs: PortfolioBlogs[] }) => {
  return (
    <div
      className="flex flex-col justify-center items-center p-4 lg:mx-60 my-12"
      id="portfolio-blogs"
    >
      <div className="relative w-full">
        <h3 className="text-2xl font-extrabold text-[#22200F]">Blogs</h3>
        <p className="text-sm text-[#83816D] pt-2">
          Some of the blogs that I have written:
        </p>
      </div>
      {portfolioBlogs && portfolioBlogs.length > 0 ? (
        <div className="flex flex-col lg:flex-row md:flex-row space-x-0 lg:space-x-6 md:space-x-6 mt-6 w-full">
          <Link
            href={portfolioBlogs[0].hostLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl shadow-lg overflow-hidden w-full lg:w-2/3 md:w-2/3 mb-4 lg:mb-0 md:mb-0 hidden lg:flex md:flex transform transition duration-300 hover:scale-102"
          >
            {portfolioBlogs[0].blogImage && (
              <CldImage
                width="200"
                height="200"
                src={portfolioBlogs[0].blogImage}
                alt={portfolioBlogs[0].blogTitle}
                className="w-80 h-full object-cover"
                priority
              />
            )}
            <div className="bg-[#22200F] text-white w-96 flex flex-col px-6 py-8">
              <h3 className="font-bold text-xl mb-4">
                {portfolioBlogs[0].blogTitle}
              </h3>
              <p className="text-xs flex-grow">
                {portfolioBlogs[0].blogDescription}
              </p>
              <div className="flex flex-row items-center space-x-4 mt-4">
                <p className="text-xs">{portfolioBlogs[0].publishDate}</p>
                <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center">
                  {getHostIcon(portfolioBlogs[0].hostSource)}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-black">
                  {portfolioBlogs[0].avgReadTime}
                </span>
              </div>
            </div>
          </Link>
          <Link
            href={portfolioBlogs[0].hostLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-xl shadow-lg overflow-hidden w-full lg:w-1/3 md:w-1/3 mb-4 lg:mb-0 md:mb-0 lg:hidden md:hidden transform transition duration-300 hover:scale-102"
          >
            {portfolioBlogs[0].blogImage && (
              <CldImage
                width="200"
                height="200"
                src={portfolioBlogs[0].blogImage}
                alt={portfolioBlogs[0].blogTitle}
                className="w-full h-48 object-cover"
                priority
              />
            )}
            <div className="bg-black text-white w-full flex flex-col p-6">
              <h3 className="font-bold text-xl mb-4">
                {portfolioBlogs[0].blogTitle}
              </h3>
              <p className="text-xs flex-grow">
                {truncateDescription(portfolioBlogs[0].blogDescription)}
              </p>
              <div className="flex flex-row items-center space-x-4 mt-4">
                <p className="text-xs">{portfolioBlogs[0].publishDate}</p>
                <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center">
                  {getHostIcon(portfolioBlogs[0].hostSource)}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-black">
                  {portfolioBlogs[0].avgReadTime}
                </span>
              </div>
            </div>
          </Link>
          <Link
            href={portfolioBlogs[1].hostLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-xl shadow-lg overflow-hidden w-full lg:w-1/3 md:w-1/3 transform transition duration-300 hover:scale-102"
          >
            {portfolioBlogs[1].blogImage && (
              <CldImage
                width="200"
                height="200"
                src={portfolioBlogs[1].blogImage}
                alt={portfolioBlogs[1].blogTitle}
                className="w-full h-48 object-cover"
                priority
              />
            )}

            <div className="bg-white text-black w-full flex flex-col p-6">
              <h3 className="font-bold text-xl mb-4">
                {portfolioBlogs[1].blogTitle}
              </h3>
              <p className="text-xs flex-grow">
                {truncateDescription(portfolioBlogs[1].blogDescription)}
              </p>
              <div className="flex flex-row items-center space-x-4 mt-4">
                <p className="text-xs">{portfolioBlogs[1].publishDate}</p>
                <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center">
                  {getHostIcon(portfolioBlogs[1].hostSource)}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                  {portfolioBlogs[1].avgReadTime}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:space-x-6 mt-6 w-full">
          <div className="flex flex-col lg:flex-row lg:space-x-6 w-full">
            <div className="w-full lg:w-1/3">
              <Skeleton height={300} width="100%" className="m-1" />
            </div>

            <div className="w-full lg:w-1/3">
              <Skeleton height={300} width="100%" className="m-1" />
            </div>
          </div>
        </div>
      )}
      <div className="mt-8">
        <Link href="/blogs">
          <button className="bg-[#22200F] hover:bg-[#83816D] text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-300">
            View All Blogs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
