"use client";
import Body from "@app/home/sections/Body";
import Blogs from "@app/home/sections/Blogs";
import Navbar from "@app/home/sections/Navbar";
import Footer from "@app/home/sections/Footer";
import Contact from "@app/home/sections/Contact";
import Projects from "@app/home/sections/Projects";

import axios from "axios";
import { useState, useEffect } from "react";
import { PortfolioBlogs } from "@app/models/blogs";
import { PortfolioProjects } from "../models/projects";
import { AboutContent, defaultAbout } from "@app/models/about";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { defaultContact, PortfolioContact } from "@app/models/contact";

const Home = () => {
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<PortfolioBlogs[]>([]);
  const [projects, setProjects] = useState<PortfolioProjects[]>([]);
  const [showTopButton, setShowTopButton] = useState(false);
  const [about, setAbout] = useState<AboutContent>(defaultAbout);
  const [contact, setContact] = useState<PortfolioContact>(defaultContact);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutResponse = await axios.get("/api/v1/about?public=true");
        const blogResponse = await axios.get(
          "/api/v1/blogs?limit=2&public=true"
        );
        const projectResponse = await axios.get("/api/v1/projects?public=true");

        const aboutData = aboutResponse.data.data;
        setAbout(aboutData);
        setContact({
          ...aboutData.portfolioContact,
          portfolioEmail: aboutData.portfolioEmail,
        });

        const blogData = blogResponse.data.data;
        setBlogs(blogData);

        const projectData = projectResponse.data.data;
        setProjects(projectData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch data.");
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchData();

    window.scrollTo(0, 0);
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Navbar />
      <Body aboutContent={about} />
      <Projects portfolioProjects={projects} />
      <Blogs portfolioBlogs={blogs} />
      <Contact portfolioContact={contact} />
      <Footer />

      {showTopButton && (
        <FontAwesomeIcon
          onClick={scrollToTop}
          className="fixed bottom-20 right-20 rounded-full shadow-xl hover:scale-125 duration-300 ease-in-out hidden lg:block"
          icon={faCircleArrowUp}
          size="3x"
        />
      )}
    </div>
  );
};

export default Home;
