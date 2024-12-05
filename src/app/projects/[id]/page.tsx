"use client";
import axios from "axios";
import LeftSidebar from "./LeftSideBar";
import RightSidebar from "./RightSideBar";
import { CldImage } from "next-cloudinary";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@app/home/sections/Navbar";
import Footer from "@app/home/sections/Footer";
import MarkdownRenderer from "@app/components/MarkdownRenderer";
import {
  defaultProjects,
  PortfolioProjectSingle,
} from "@/app/models/projectsSingle";

function App() {
  const { id } = useParams();
  const [projects, setProjects] =
    useState<PortfolioProjectSingle>(defaultProjects);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await axios.get(
          `/api/v1/projects?id=${id}&public=true`
        );
        setProjects(projectResponse.data.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch data.");
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    fetchData();
  }, [id]);

  const extractHeadingsWithLinks = (content: string): JSX.Element => {
    const regex = /^(#{1,6})\s*(.+)$/gm;
    const matches = content.match(regex);

    return (
      <ul className="text-sm space-y-2">
        {matches?.map((match, index) => {
          const headingText = match.replace(/^(#{1,6})\s*/, "");
          const id = headingText.toLowerCase().replace(/\s+/g, "-");
          return (
            <li key={index}>
              <a
                href={`#${id}`}
                className="text-blue-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                {headingText}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="relative bg-white text-black">
      <div className="sm:px-10 lg:mx-28">
        <Navbar />
      </div>

      <div className="lg:flex lg:justify-between">
        <div className="hidden lg:block lg:w-1/4">
          {projects.inProgress && (
            <LeftSidebar note="Note: This blog is a work in progress. The project is still being built, and some sections are yet to be completed." />
          )}
        </div>

        <div className="px-4 py-8 sm:px-8 lg:px-12 lg:-ml-52 lg:w-2/4">
          {projects.inProgress && (
            <div className="block lg:hidden px-4 py-6 -mt-10">
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow-md">
                <p className="text-yellow-700 text-sm mt-2">
                  Note: This blog is a work in progress. The project is still
                  being built, and some sections are yet to be completed.
                </p>
              </div>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            {projects.projectTitle}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#676451]">
            {projects.projectDescription}
          </p>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-[#676451]">
            {projects.publishDate}
          </p>

          <div className="flex justify-center items-center mt-8">
            {projects.projectImage ? (
              <CldImage
                width="200"
                height="200"
                src={projects.projectImage}
                alt={projects.projectTitle}
                className="object-cover"
                priority
              />
            ) : (
              <p className="text-gray-500">Image not available</p>
            )}
          </div>

          <div className="mt-8">
            <MarkdownRenderer content={projects.projectArticle} />
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/4">
          <RightSidebar
            items={extractHeadingsWithLinks(projects.projectArticle)}
          />
        </div>
      </div>

      <div className="block lg:hidden px-4 py-6">
        <RightSidebar
          items={extractHeadingsWithLinks(projects.projectArticle)}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;
