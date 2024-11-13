import React from "react";
import Image from "next/image";
import gtaImage from "../../assets/gta5.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faXTwitter,
  faDev,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Body = () => {
  const title = "Hello! I'm Delba, a developer based in England.";

  return (
    <div className="flex flex-col p-4 lg:p-4" id="portfolio-about">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center my-12 lg:mx-60">
        <div className="w-full">
          <h3 className="font-extrabold text-4xl">{title}</h3>
          <br />
          <p className="text-sm">
            I love building tools that are user-friendly, simple and delightful.
          </p>
          <br />
          <p className="text-sm">
            I was a student at Lambda School where I spent 8 months learning the
            fundamentals of front-end and back-end web development. I also
            worked at Lambda where my role was split between helping scale
            processes through automations and overseeing student teams.
          </p>
          <br />
          <p className="text-sm">
            Through these experiences, I had the opportunity to work with both
            small and large, specialised and cross-functional teams across
            different time zones and developed a working style that leans
            towards flexibility, clarity, and collaboration.
          </p>
          <br />
          <p className="text-sm">
            I'm currently looking for a new role as a developer.{" "}
            <span className="font-semibold">Hire me?</span>
          </p>
          <div className="flex justify-start items-center mt-4 -ml-2">
            <FontAwesomeIcon icon={faLinkedinIn} className="mx-2 h-6 w-6" />
            <FontAwesomeIcon icon={faDev} className="mx-2 h-6 w-6" />
            <FontAwesomeIcon icon={faXTwitter} className="mx-2 h-6 w-6" />
            <FontAwesomeIcon
              icon={faSquareInstagram}
              className="mx-2 h-6 w-6"
            />
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center lg:ml-12 mt-4 lg:mt-0">
          <Image
            src={gtaImage}
            alt="gta img"
            className="rounded-lg w-full h-auto lg:h-96 lg:max-w-full object-cover shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
