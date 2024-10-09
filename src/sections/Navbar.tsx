import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="text-[#676451] flex items-start justify-between py-6 lg:px-20 md:px-20 px-4 text-lg font-semibold">
      <div className="flex items-center">
        <h3>KAUSHIK K</h3>
      </div>
      <div className="flex items-center cursor-pointer">
        <div
          className="block lg:hidden xl:hidden md:hidden"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: "#676451" }}
            size="lg"
          />
        </div>
        <ul
          className={`flex flex-row gap-10 ${
            isOpen ? "block" : "hidden"
          } lg:flex xl:flex md:flex`}
        >
          <li>About</li>
          <li>Projects</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
