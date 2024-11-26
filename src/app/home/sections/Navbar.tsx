"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as Collapsible from "@radix-ui/react-collapsible";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("about");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  const links = [
    { name: "about", href: "/home" },
    { name: "projects", href: "#portfolio-projects" },
    { name: "blogs", href: "#portfolio-blogs" },
    { name: "contact", href: "#portfolio-contact" },
  ];

  return (
    <div className="container mx-auto lg:px-8">
      <div className="text-[#676451] flex items-start justify-between py-6 lg:mx-28 my-2 px-4 text-lg font-semibold">
        <Link href="/home">
          <div className="flex items-center mt-1">
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
              {links.map((link) => (
                <Link key={link.name} href={link.href}>
                  <li
                    onClick={() => handleLinkClick(link.name)}
                    className={`flex justify-between items-center cursor-pointer px-4 py-1 rounded-xl transition-colors ${
                      activeLink === link.name
                        ? "bg-[#ECE9D5] text-black"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                  </li>
                </Link>
              ))}
            </Collapsible.Content>
          </Collapsible.Root>

          <ul className="hidden lg:flex xl:flex md:flex gap-10">
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                <li
                  onClick={() => handleLinkClick(link.name)}
                  className={`cursor-pointer px-4 py-1 rounded-xl transition-colors ${
                    activeLink === link.name
                      ? "bg-[#ECE9D5] text-black"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
