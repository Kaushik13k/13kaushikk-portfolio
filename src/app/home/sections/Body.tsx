import React from "react";
import { CldImage } from "next-cloudinary";
import { AboutContent } from "@/app/models/about";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faXTwitter,
  faDev,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Body = ({ aboutContent }: { aboutContent: AboutContent }) => {
  const paragraphs = (aboutContent.portfolioAbout || "")
    .replace(/\\n/g, "\n")
    .split("\n\n");

  return (
    <div className="flex flex-col p-4 lg:p-4" id="portfolio-about">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:my-6 my-2 lg:mx-60">
        <div className="w-full">
          <h3 className="font-extrabold text-4xl">
            {aboutContent.portfolioTitle}
          </h3>
          <br />
          {paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p className="text-sm">{paragraph}</p>
              {index < paragraphs.length - 1 && <br />}
            </React.Fragment>
          ))}
          <br />
          {aboutContent.isHireMe && (
            <p className="text-sm">
              I'm currently looking for a new role as a developer.{" "}
              <a
                href={`mailto:${aboutContent.portfolioEmail}`}
                className="font-semibold text-red-600 hover:underline"
              >
                Hire me?
              </a>
            </p>
          )}
          <div className="flex justify-start items-center mt-4 -ml-2">
            {aboutContent.portfolioContact && (
              <>
                <a
                  href={aboutContent.portfolioContact.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="mx-2 h-6 w-6 cursor-pointer"
                  />
                </a>
                <a
                  href={aboutContent.portfolioContact.devTo || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faDev}
                    className="mx-2 h-6 w-6 cursor-pointer"
                  />
                </a>
                <a
                  href={aboutContent.portfolioContact.twitter || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className="mx-2 h-6 w-6 cursor-pointer"
                  />
                </a>
                <a
                  href={aboutContent.portfolioContact.instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faSquareInstagram}
                    className="mx-2 h-6 w-6 cursor-pointer"
                  />
                </a>
              </>
            )}
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center lg:ml-12 mt-4 lg:mt-0">
          {aboutContent.portfolioImage && (
            <CldImage
              width="200"
              height="200"
              src={aboutContent.portfolioImage}
              alt="Portfolio Image"
              className="rounded-lg w-72 h-96 max-w-full object-cover shadow-2xl"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
