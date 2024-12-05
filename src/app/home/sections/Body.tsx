import React from "react";
import { CldImage } from "next-cloudinary";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AboutContent } from "@/app/models/about";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import {
  faLinkedinIn,
  faXTwitter,
  faDev,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

function convertToHighlightArray(
  input: string
): { phrase: string; color: string }[] {
  return input
    .split(";")
    .map((item) => {
      const [phrase, color] = item.split(":").map((part) => part.trim());
      if (phrase && color) {
        return { phrase, color };
      }
    })
    .filter(Boolean) as { phrase: string; color: string }[];
}

const Body = ({ aboutContent }: { aboutContent: AboutContent }) => {
  const paragraphs = (aboutContent?.portfolioAbout || "")
    .replace(/\\n/g, "\n")
    .split("\n\n");

  const highlightWordsWithColors = convertToHighlightArray(
    aboutContent?.highlightWords || ""
  );
  let isLoading = false;
  if (
    aboutContent.portfolioTitle === "" ||
    aboutContent.portfolioAbout === "" ||
    aboutContent.portfolioImage === ""
  ) {
    isLoading = true;
  }

  return (
    <div className="flex flex-col p-4 lg:p-4" id="portfolio-about">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:my-6 my-2 lg:mx-60">
        <div className="w-full">
          <h3 className="font-extrabold text-4xl">
            <RoughNotationGroup show={true}>
              {isLoading ? (
                <Skeleton width={300} height={50} />
              ) : (
                aboutContent.portfolioTitle.split(" ").map((word, index) => {
                  const cleanedWord = word.replace(/[.,!?]/g, "");
                  let color = "";

                  if (cleanedWord === "developer") color = "#E6E6FA";
                  if (cleanedWord === "India") color = "#FF0000";

                  return (
                    <React.Fragment key={index}>
                      {color ? (
                        <RoughNotation
                          type="highlight"
                          show={true}
                          color={color}
                        >
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              wordBreak: "keep-all",
                            }}
                          >
                            {word}
                          </span>
                        </RoughNotation>
                      ) : (
                        word
                      )}{" "}
                    </React.Fragment>
                  );
                })
              )}
            </RoughNotationGroup>
          </h3>

          <RoughNotationGroup show={true}>
            {isLoading ? (
              <Skeleton count={6} height={15} />
            ) : (
              paragraphs.map((paragraph, index) => {
                const elements: React.ReactNode[] = [];
                let remainingText = paragraph;

                highlightWordsWithColors.forEach(({ phrase, color }, idx) => {
                  const phraseRegex = new RegExp(
                    `(${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                    "gi"
                  );

                  remainingText = remainingText.replace(
                    phraseRegex,
                    (match) => `[[HIGHLIGHT:${match}:${color}:${idx}]]`
                  );
                });

                const parts = remainingText.split(
                  /(\[\[HIGHLIGHT:.*?:.*?:.*?\]\])/
                );

                parts.forEach((part, partIndex) => {
                  if (part.startsWith("[[HIGHLIGHT:")) {
                    const contentMatch = part.match(
                      /\[\[HIGHLIGHT:(.*?):(.*?):(.*?)\]\]/
                    );
                    if (contentMatch) {
                      const content = contentMatch[1];
                      const color = contentMatch[2];
                      const index = parseInt(contentMatch[3], 10);

                      elements.push(
                        <RoughNotation
                          key={`${index}-${partIndex}`}
                          type="highlight"
                          show={true}
                          color={color}
                          animationDelay={index * 1000}
                          animationDuration={1000}
                        >
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              wordBreak: "keep-all",
                            }}
                          >
                            {content}
                          </span>
                        </RoughNotation>
                      );
                    }
                  } else {
                    elements.push(part);
                  }
                });

                return (
                  <React.Fragment key={index}>
                    <p className="text-sm" style={{ whiteSpace: "normal" }}>
                      {elements}
                    </p>
                    {index < paragraphs.length - 1 && <br />}
                  </React.Fragment>
                );
              })
            )}
          </RoughNotationGroup>

          <br />
          {isLoading ? (
            <Skeleton width={150} height={20} />
          ) : (
            aboutContent.isHireMe && (
              <p className="text-sm">
                I&apos;m currently looking for a new role as a{" "}
                <span
                  style={{
                    backgroundColor: "#FFD700",
                    padding: "0 4px",
                    borderRadius: "2px",
                  }}
                >
                  developer
                </span>
                .{" "}
                <a
                  href={`mailto:${aboutContent.portfolioEmail}`}
                  className="font-semibold text-red-600 hover:underline"
                >
                  <RoughNotation type="circle" show={true} color="#FF0000">
                    Hire me?
                  </RoughNotation>
                </a>
              </p>
            )
          )}

          <div className="flex justify-start items-center mt-4 -ml-2">
            {isLoading ? (
              <div className="ml-2 flex space-x-4">
                {" "}
                <Skeleton width={30} height={30} circle={true} />
                <Skeleton width={30} height={30} circle={true} />
                <Skeleton width={30} height={30} circle={true} />
                <Skeleton width={30} height={30} circle={true} />
              </div>
            ) : (
              aboutContent.portfolioContact && (
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
              )
            )}
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex justify-center lg:ml-12 mt-4 lg:mt-0">
          {isLoading ? (
            <Skeleton width={300} height={400} />
          ) : (
            aboutContent.portfolioImage && (
              <CldImage
                width="200"
                height="200"
                src={aboutContent.portfolioImage}
                alt="Portfolio Image"
                className="rounded-lg w-72 h-96 max-w-full object-cover shadow-2xl"
                priority
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
