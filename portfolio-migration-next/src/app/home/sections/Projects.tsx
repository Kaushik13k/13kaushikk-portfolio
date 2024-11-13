"use client";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXbox,
  faPlaystation,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import gtaImage from "../../assets/gta5.jpg";

import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const games = [
  {
    name: "Grand Theft Auto V",
    description:
      "An action-adventure game set in an open world with a rich storyline and expansive gameplay options hello world.",
    icons: [faXbox, faApple, faPlaystation],
  },
  {
    name: "Red Dead Redemption 2",
    description:
      "A western-themed action-adventure game that follows Arthur Morgan and his gang in a world full of challenges.",
    icons: [faApple, faPlaystation],
  },
  {
    name: "Halo Infinite",
    description:
      "A sci-fi first-person shooter game featuring Master Chief and an expansive universe to explore hello world hlw.",
    icons: [faXbox, faPlaystation],
  },
  {
    name: "Grand Theft Auto V",
    description:
      "An action-adventure game set in an open world with a rich storyline and expansive gameplay options hello world.",
    icons: [faXbox, faApple, faPlaystation],
  },
  {
    name: "Red Dead Redemption 2",
    description:
      "A western-themed action-adventure game that follows Arthur Morgan and his gang in a world full of challenges.",
    icons: [faApple, faPlaystation],
  },
  {
    name: "Halo Infinite",
    description:
      "A sci-fi first-person shooter game featuring Master Chief and an expansive universe to explore hello world hlw.",
    icons: [faXbox, faPlaystation],
  },
];

const truncateDescription = (description) => {
  if (description.length > 99) {
    return description.slice(0, 99) + "...";
  }
  return description;
};

const Projects = () => {
  const scrollContainerRef = useRef(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const updateButtonStates = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;

      setIsLeftDisabled(scrollLeft === 0);
      setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
    updateButtonStates();
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
    updateButtonStates();
  };

  useEffect(() => {
    updateButtonStates();

    const handleScroll = () => updateButtonStates();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-4 lg:mx-60">
      <div className="relative w-full">
        <div className="absolute left-0 top-1/2 lg:-left-10">
          <FontAwesomeIcon
            onClick={scrollLeft}
            style={{ fontSize: "30px" }}
            className={`bg-[#22200F] text-white p-2 rounded-full hover:bg-[#83816D] ${
              isLeftDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            icon={faCircleArrowLeft}
            disabled={isLeftDisabled}
          />
        </div>

        <div className="absolute right-0 lg:-right-10 top-1/2">
          <FontAwesomeIcon
            onClick={scrollRight}
            style={{ fontSize: "30px" }}
            className={`bg-[#22200F] text-white p-2 rounded-full hover:bg-[#83816D] ${
              isRightDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            icon={faCircleArrowRight}
            disabled={isRightDisabled}
          />
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-[#22200F]">Projects</h3>
          <p className="text-sm text-[#83816D] pt-2">
            Some of the side projects I'm currently working on:
          </p>
        </div>
        <div
          className="overflow-x-auto w-full hide-scrollbar"
          ref={scrollContainerRef}
        >
          <div className="flex space-x-6 md:space-x-10 pt-10">
            {games.map((game, index) => (
              <div
                key={index}
                className="flex flex-col items-start w-64 md:w-80 flex-shrink-0"
              >
                <div className="bg-white rounded-lg shadow-md w-full">
                  <div className="flex items-center justify-start bg-[#BFBCA7] p-2 rounded-t-lg">
                    <div className="w-2 h-2 bg-[#676451] rounded-full mx-1 aspect-square"></div>
                    <div className="w-2 h-2 bg-[#676451] rounded-full mx-1 aspect-square"></div>
                    <div className="w-2 h-2 bg-[#676451] rounded-full mx-1 aspect-square"></div>

                    <div className="px-2">
                      <input
                        type="text"
                        className="w-full px-4 py-0.5 bg-white border border-[#BFBCA7] rounded-md text-sm"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="p-3">
                    <Image
                      src={gtaImage}
                      alt="gta img"
                      className="rounded-lg w-full h-35 object-cover"
                    />

                    <div className="mt-3 ml-1">
                      <div className="flex space-x-2">
                        {game.icons.map((icon, iconIndex) => {
                          const [isHovered, setIsHovered] = useState(false);

                          return (
                            <FontAwesomeIcon
                              key={iconIndex}
                              icon={icon}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                              style={{
                                color: isHovered ? "#22200F" : "#BFBCA7",
                              }}
                              className="w-5 h-5"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 ml-1">
                  <h3 className="text-lg font-semibold text-[#22200F]">
                    {index + 1}. {game.name}
                  </h3>
                  <p className="text-sm text-[#676451]">
                    {truncateDescription(game.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
