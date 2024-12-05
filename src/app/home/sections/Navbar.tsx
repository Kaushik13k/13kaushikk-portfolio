"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("about");

  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (pathname.includes("/projects")) {
        setActiveLink("projects");
      } else if (pathname.includes("/blogs")) {
        setActiveLink("blogs");
      } else if (pathname === "/home") {
        setActiveLink("about");
      } else {
        setActiveLink("");
      }
    }
  }, [pathname, isClient]);

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
                    className={`cursor-pointer px-4 py-1 transition-all ${
                      activeLink === link.name
                        ? "border-b-2 border-black text-black"
                        : "hover:text-gray-700"
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
                  className={`cursor-pointer px-4 py-1 transition-all ${
                    activeLink === link.name
                      ? "border-b-2 border-black text-black"
                      : "hover:text-gray-700"
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
