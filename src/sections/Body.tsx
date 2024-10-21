import React from "react";
import gtaImage from "../assets/gta-5.jpg";
import { annotate } from "rough-notation";

// TODO:
// 1. Color codings
// 2. mobile view
// 3. naming convetion and names
// 4. Handle such that, now i give description once and it will space and do other stuffs on its own
const Body = () => {
  const title = "Hello! I'm Delba, a developer based in England.";
  return (
    <div className="flex justify-start items-center p-4 lg:mx-48 my-12">
      <div className="w-[1300px]">
        <h3 className="font-extrabold text-4xl">{title}</h3>
        <br />
        <p>
          I love building tools that are user-friendly, simple and delightful.{" "}
        </p>
        <br />
        <p>
          I was a student at Lambda School where I spent 8 months learning the
          fundamentals of front-end and back-end web development. I also worked
          at Lambda where my role was split between helping scale processes
          through automations and overseeing student teams.{" "}
        </p>
        <br />
        <p>
          Through these experiences, I had the opportunity to work with both
          small and large, specialised and cross-functional teams across
          different time zones and developed a working style that leans towards
          flexibility, clarity, and collaboration.{" "}
        </p>
        <br />
        <p>
          I'm currently looking for a new role as a developer.{" "}
          <span className="font-semibold">Hire me?</span>
        </p>
      </div>
      <div>
        <img
          src={gtaImage}
          alt="gta img"
          className="rounded-lg w-10/12 object-cover h-80 ml-12 shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Body;
