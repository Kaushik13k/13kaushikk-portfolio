/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import "lineicons/dist/lineicons.css";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { iconMappings } from "@/app/constants/icons";
import { PortfolioProjects } from "@/app/models/projects";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const truncateDescription = (description: string) => {
  if (description.length > 99) {
    return description.slice(0, 99) + "...";
  }
  return description;
};

const Projects = ({
  portfolioProjects,
}: {
  portfolioProjects: PortfolioProjects[];
}) => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const isLoading = !portfolioProjects || portfolioProjects.length === 0;

  const [hoveredIcons, setHoveredIcons] = useState<boolean[][]>(() =>
    portfolioProjects.map((project) =>
      project.selectedTechnologies.map(() => false)
    )
  );

  useEffect(() => {
    if (portfolioProjects.length) {
      const initialHoveredIcons = portfolioProjects.map((project) =>
        project.selectedTechnologies.map(() => false)
      );
      setHoveredIcons(initialHoveredIcons);
    }
  }, [portfolioProjects, router]);

  useEffect(() => {
    updateButtonStates();

    const handleScroll = () => updateButtonStates();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => container?.removeEventListener("scroll", handleScroll);
  }, [hoveredIcons, portfolioProjects]);

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
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
      updateButtonStates();
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
      updateButtonStates();
    }
  };

  const handleIconHover = (
    projectIndex: number,
    iconIndex: number,
    isHovered: boolean
  ) => {
    setHoveredIcons((prev) =>
      prev.map((icons, i) =>
        i === projectIndex
          ? icons.map((hover, j) => (j === iconIndex ? isHovered : hover))
          : icons
      )
    );
  };

  const handleCardClick = (id: string) => {
    window.open(`/projects/${id}`, "_blank");
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 lg:mx-60">
      <div className="relative w-full">
        <div className="absolute left-0 top-1/2 lg:-left-10 z-50">
          <FontAwesomeIcon
            onClick={scrollLeft}
            style={{
              fontSize: "30px",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
            className={`bg-[#22200F] text-white p-2 rounded-full hover:bg-[#83816D] ${
              isLeftDisabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            icon={faCircleArrowLeft}
          />
        </div>

        <div className="absolute right-0 lg:-right-10 top-1/2 z-50">
          <FontAwesomeIcon
            onClick={scrollRight}
            style={{
              fontSize: "30px",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
            className={`bg-[#22200F] text-white p-2 rounded-full hover:bg-[#83816D] ${
              isRightDisabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            icon={faCircleArrowRight}
          />
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-[#22200F]">Projects</h3>
          <p className="text-sm text-[#83816D] pt-2">
            Some of the side projects I&apos;m currently working on:
          </p>
        </div>
        {isLoading ? (
          <div className="flex space-x-4 md:space-x-6 lg:space-x-8 pt-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-48 md:w-64 lg:w-80 flex-shrink-0 space-y-4"
              >
                <Skeleton
                  className="rounded-lg h-36 md:h-48 lg:h-60"
                  width="100%"
                />

                <Skeleton className="rounded w-3/4 h-5" />
                <Skeleton className="rounded w-2/3 h-4" />
                <Skeleton className="rounded w-1/2 h-4" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="overflow-x-auto w-full"
            style={{ scrollbarWidth: "none", overflowX: "auto" }}
            ref={scrollContainerRef}
          >
            <div className="flex space-x-6 md:space-x-10 pt-10">
              {portfolioProjects.map((project, projectIndex) => (
                <div
                  key={project.projectTitle + projectIndex}
                  className="flex flex-col items-start w-64 md:w-80 flex-shrink-0 group cursor-pointer transform transition duration-300 hover:scale-102"
                  onClick={() => handleCardClick(project.id)}
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
                      <CldImage
                        width="200"
                        height="200"
                        src={project.projectImage}
                        alt={project.projectTitle}
                        className="rounded-lg w-80 h-44 object-cover"
                        priority
                      />
                      <div className="mt-3 ml-1 -mb-2">
                        <div className="flex space-x-2">
                          {project.selectedTechnologies.map(
                            (icon, iconIndex) => {
                              const iconInfo = iconMappings[icon.toLowerCase()];
                              if (!iconInfo) return null;

                              return iconInfo.type === "lineicon" ? (
                                <Link
                                  key={`${project.projectTitle}-${icon}-${iconIndex}`}
                                  href={iconMappings[icon.toLowerCase()].link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i
                                    key={iconIndex}
                                    className={`lni lni-${iconInfo.icon}`}
                                    onMouseEnter={() =>
                                      handleIconHover(
                                        projectIndex,
                                        iconIndex,
                                        true
                                      )
                                    }
                                    onMouseLeave={() =>
                                      handleIconHover(
                                        projectIndex,
                                        iconIndex,
                                        false
                                      )
                                    }
                                    style={{
                                      color: hoveredIcons[projectIndex]?.[
                                        iconIndex
                                      ]
                                        ? "#22200F"
                                        : "#BFBCA7",
                                      fontSize: "1.4rem",
                                      transition: "color 0.2s ease",
                                    }}
                                  />
                                </Link>
                              ) : (
                                <Link
                                  key={`${project.projectTitle}-${icon}-${iconIndex}`}
                                  href={iconMappings[icon.toLowerCase()].link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    key={iconIndex}
                                    src={iconInfo.icon.src || iconInfo.icon}
                                    alt={icon}
                                    onMouseEnter={() =>
                                      handleIconHover(
                                        projectIndex,
                                        iconIndex,
                                        true
                                      )
                                    }
                                    onMouseLeave={() =>
                                      handleIconHover(
                                        projectIndex,
                                        iconIndex,
                                        false
                                      )
                                    }
                                    style={{
                                      width: "1.4rem",
                                      height: "1.4rem",
                                      filter: hoveredIcons[projectIndex]?.[
                                        iconIndex
                                      ]
                                        ? "brightness(0) saturate(100%) invert(9%) sepia(13%) saturate(2025%) hue-rotate(16deg) brightness(100%) contrast(92%)"
                                        : "brightness(0) saturate(100%) invert(84%) sepia(2%) saturate(1791%) hue-rotate(16deg) brightness(93%) contrast(81%)",
                                      transition: "filter 0.2s ease",
                                    }}
                                  />
                                </Link>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 ml-1">
                    <h3 className="text-lg font-semibold text-[#22200F]">
                      {projectIndex + 1}. {project.projectTitle}
                    </h3>
                    <p className="text-sm text-[#676451]">
                      {truncateDescription(project.projectDescription)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
