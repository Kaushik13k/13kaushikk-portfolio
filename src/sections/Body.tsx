import React from "react";
import gtaImage from "../assets/gta-5.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faDev,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Body = () => {
  const title = "Hello! I'm Delba, a developer based in England.";
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center p-4 lg:mx-60 my-12">
        <div className="w-[1300px]">
          <h3 className="font-extrabold text-4xl">{title}</h3>
          <br />
          <p className="text-sm">
            I love building tools that are user-friendly, simple and delightful.{" "}
          </p>
          <br />
          <p className="text-sm">
            I was a student at Lambda School where I spent 8 months learning the
            fundamentals of front-end and back-end web development. I also
            worked at Lambda where my role was split between helping scale
            processes through automations and overseeing student teams.{" "}
          </p>
          <br />
          <p className="text-sm">
            Through these experiences, I had the opportunity to work with both
            small and large, specialised and cross-functional teams across
            different time zones and developed a working style that leans
            towards flexibility, clarity, and collaboration.{" "}
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
            {/* <FontAwesomeIcon icon={faInstagram} className="mx-2 h-6 w-6" /> */}
            <FontAwesomeIcon
              icon={faSquareInstagram}
              className="mx-2 h-6 w-6"
            />
          </div>
        </div>
        <div>
          <img
            src={gtaImage}
            alt="gta img"
            className="rounded-lg w-10/12 object-cover h-80 ml-12 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
