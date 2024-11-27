import React from "react";
import Image from "next/image";
import profileImgage from "@app/assets/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faXTwitter,
  faDev,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Body = () => {
  const title = "Hello! I'm Kaushik, a developer based in India.";
  const textFromDb = `I love building tools that are user-friendly, simple and delightful.\n\n
            I was a student at Lambda School where I spent 8 months learning the
            fundamentals of front-end and back-end web development. I also
            worked at Lambda where my role was split between helping scale
            processes through automations and overseeing student teams.\n\nThrough
            these experiences, I had the opportunity to work with both small and
            large, specialised and cross-functional teams across different time
            zones and developed a working style that leans towards flexibility,
            clarity, and collaboration.`;

  const paragraphs = textFromDb.split("\n\n");

  return (
    <div className="flex flex-col p-4 lg:p-4" id="portfolio-about">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:my-6 my-2 lg:mx-60">
        <div className="w-full">
          <h3 className="font-extrabold text-4xl">{title}</h3>
          <br />
          {paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p className="text-sm">{paragraph}</p>
              {index < paragraphs.length - 1 && <br />}
            </React.Fragment>
          ))}
          <br />
          {/* <p className="text-sm">
            I'm currently looking for a new role as a developer.{" "}
            <span className="font-semibold">Hire me?</span>
          </p> */}
          <div className="flex justify-start items-center mt-4 -ml-2">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="mx-2 h-6 w-6 cursor-pointer"
              />
            </a>
            <a href="https://dev.to/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faDev}
                className="mx-2 h-6 w-6 cursor-pointer"
              />
            </a>
            <a
              href="https://x.com/?lang=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faXTwitter}
                className="mx-2 h-6 w-6 cursor-pointer"
              />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faSquareInstagram}
                className="mx-2 h-6 w-6 cursor-pointer"
              />
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center lg:ml-12 mt-4 lg:mt-0">
          <Image
            src={profileImgage}
            alt="gta img"
            className="rounded-lg w-72 h-96 max-w-full object-cover shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
