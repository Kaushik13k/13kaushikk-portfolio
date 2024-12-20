import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const CircleArrowRight = ({ guidedTest = false }) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <Link href="/home">
        <FontAwesomeIcon
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
