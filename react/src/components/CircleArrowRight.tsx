import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CircleArrowRight = ({ guidedTest = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };
  return (
    <div className="flex items-center justify-center mt-4">
      <FontAwesomeIcon
        onClick={handleClick}
        icon={faCircleArrowRight}
        className="ml-2 text-4xl text-dark-brownish-black hover:text-grayish-brown transition duration-300"
      />
      {guidedTest && (
        <span className="ml-2 text-muted-olive text-sm font-bold">
          Click here!
        </span>
      )}
    </div>
  );
};

export default CircleArrowRight;
