import React from "react";
import gtaImage from "../assets/gta5.jpg";

function Blogs() {
  return (
    <div className="flex flex-col justify-center items-center p-4 lg:mx-60 my-12">
      <div className="relative w-full">
        <h3 className="text-2xl font-extrabold text-[#22200F]">Blogs</h3>
        <p className="text-sm text-[#83816D] pt-2">
          Some of the blogs that I have written:
        </p>
      </div>

      <div className="flex flex-col lg:flex-row md:flex-row space-x-0 lg:space-x-6 md:space-x-6 mt-6 w-full">
        <div className="rounded-xl shadow-lg overflow-hidden w-full lg:w-2/3 md:w-2/3 mb-4 lg:mb-0 md:mb-0 hidden lg:flex md:flex">
          <div>
            <img
              src={gtaImage}
              alt="gta img"
              className="w-80 h-full object-cover"
            />
          </div>
          <div className="bg-[#22200F] text-white w-96 flex flex-col px-6 py-8">
            <h3 className="font-bold text-xl mb-4">Title-1</h3>
            <p className="text-xs flex-grow">
              Explore Europe’s finest accommodations, from the sun-drenched
              shores of the French Riviera to the historic elegance of London
              and the tranquil beauty of the Bavarian Alps.
            </p>
            <p className="text-xs mt-4">Oct 12, 2023</p>
          </div>
        </div>

        <div className="flex flex-col rounded-xl shadow-lg overflow-hidden w-full lg:w-1/3 md:w-1/3 mb-4 lg:mb-0 md:mb-0 lg:hidden md:hidden">
          <div>
            <img
              src={gtaImage}
              alt="gta img"
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="bg-black text-white w-full flex flex-col p-6">
            <h3 className="font-bold text-xl mb-4">Title-2</h3>
            <p className="text-xs flex-grow">
              Explore Europe’s finest accommodations, from the sun-drenched
              shores of the French Riviera to the historic elegance of London
              and the tranquil beauty of the Bavarian Alps.
            </p>
            <p className="text-xs mt-4">Oct 12, 2023</p>
          </div>
        </div>

        <div className="flex flex-col rounded-xl shadow-lg overflow-hidden w-full lg:w-1/3 md:w-1/3">
          <div>
            <img
              src={gtaImage}
              alt="gta img"
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="bg-white text-black w-full flex flex-col p-6">
            <h3 className="font-bold text-xl mb-4">Title-3</h3>
            <p className="text-xs flex-grow">
              Boutique hotels have mushroomed in Budapest in recent years, and
              on...
            </p>
            <p className="text-xs mt-4">Oct 12, 2023</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-[#22200F] hover:bg-[#83816D] text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-300">
          View All Blogs
        </button>
      </div>
    </div>
  );
}

export default Blogs;
