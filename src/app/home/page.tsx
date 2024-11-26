"use client";
import Footer from "./sections/Footer";
import Body from "./sections/Body";
import Navbar from "./sections/Navbar";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Blogs from "./sections/Blogs";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
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
      <Body />
      <Projects />
      <Blogs />
      <Contact />
      <Footer />

      {showTopButton && (
        <FontAwesomeIcon
          onClick={scrollToTop}
          className="fixed bottom-20 right-20 rounded-full shadow-xl hover:scale-125 duration-300 ease-in-out"
          icon={faCircleArrowUp}
          size="3x"
        />
      )}
    </div>
  );
};

export default Home;
