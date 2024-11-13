import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CircleArrowRight = ({ guidedTest = false }) => {
  // const handleClick = () => {
  //   console.log("clicked!");
  //   // navigate("/home");
  // };
  return (
    <div className="flex items-center justify-center mt-4">
      <Link href="/home">
        <FontAwesomeIcon
          // onClick={handleClick}
          icon={faCircleArrowRight}
          className="ml-2 text-4xl text-dark-brownish-black hover:text-grayish-brown transition duration-300"
        />
      </Link>
      {guidedTest && (
        <span className="ml-2 text-muted-olive text-sm font-bold">
          Click here!
        </span>
      )}
    </div>
  );
};

export default CircleArrowRight;
