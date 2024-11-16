"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as Collapsible from "@radix-ui/react-collapsible";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container mx-auto lg:px-8">
      <div className="text-[#676451] flex items-start justify-between py-6 lg:mx-28 md:mx-28 my-2 px-4 text-lg font-semibold">
        <Link href="/home">
          <div className="flex items-center">
            <h3>KAUSHIK K</h3>
          </div>
        </Link>
        <div className="flex items-center">
          <div
            className="block lg:hidden xl:hidden md:hidden cursor-pointer"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              style={{ color: "#676451" }}
              size="lg"
              className="transition-transform duration-300"
            />
          </div>

          <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
            <Collapsible.Content
              className={`flex flex-col mt-5 mr-5 gap-2 p-4 bg-white shadow-lg rounded-lg absolute right-0 transition-all duration-300 ease-in-out transform ${
                isOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              style={{ minWidth: "150px" }}
            >
              <Link href="/home">
                <li className="flex justify-between items-center cursor-pointer hover:text-blue-500 transition-colors">
                  About
                </li>
              </Link>
              <div className="border-b border-gray-200 my-1" />{" "}
              <Link href="#portfolio-projects">
                <li className="flex justify-between items-center cursor-pointer hover:text-blue-500 transition-colors">
                  Projects
                </li>
              </Link>
              <div className="border-b border-gray-200 my-1" />{" "}
              <Link href="#portfolio-blogs">
                <li className="flex justify-between items-center cursor-pointer hover:text-blue-500 transition-colors">
                  Blogs
                </li>
              </Link>
              <div className="border-b border-gray-200 my-1" />{" "}
              <Link href="#portfolio-contact">
                <li className="flex justify-between items-center cursor-pointer hover:text-blue-500 transition-colors">
                  Contact
                </li>
              </Link>
            </Collapsible.Content>
          </Collapsible.Root>

          <ul className="hidden lg:flex xl:flex md:flex gap-10">
            <Link href="/home">
              <li className="hover:text-blue-500 transition-colors cursor-pointer">
                About
              </li>
            </Link>
            <Link href="#portfolio-projects">
              <li className="hover:text-blue-500 transition-colors cursor-pointer">
                Projects
              </li>
            </Link>
            <Link href="#portfolio-blogs">
              <li className="hover:text-blue-500 transition-colors cursor-pointer">
                Blog
              </li>
            </Link>
            <Link href="#portfolio-contact">
              <li className="hover:text-blue-500 transition-colors cursor-pointer">
                Contact
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
