import React from "react";
import Skeleton from "react-loading-skeleton";
import { PortfolioContact } from "@/app/models/contact";

const Contact = ({
  portfolioContact,
}: {
  portfolioContact: PortfolioContact;
}) => {
  const isLoading = !portfolioContact || portfolioContact.portfolioEmail === "";
  return (
    <div className="flex flex-col" id="portfolio-contact">
      <div className="flex justify-start items-center p-4 lg:mx-60 mb-12">
        <div className="w-[1300px]">
          <h3 className="text-2xl font-extrabold text-[#22200F]">
            {" "}
            Get in touch
          </h3>

          <p className="text-sm text-[#83816D] pt-2">
            Do you have an idea you&apos;d like to discuss? Feel free to reach
            me at
            <a href={`mailto:${portfolioContact.portfolioEmail}`}>
              {isLoading ? (
                <Skeleton height={15} width={`10%`} />
              ) : (
                <span className="text-red-700">
                  {" "}
                  {portfolioContact.portfolioEmail}
                </span>
              )}
            </a>{" "}
            . You can also find me on ,
            <a href={portfolioContact.twitter}>
              <span className="text-red-700"> Twitter,</span>
            </a>{" "}
            <a href={portfolioContact.github}>
              <span className="text-red-700"> Github</span>
            </a>{" "}
            and{" "}
            <a href={portfolioContact.linkedin}>
              <span className="text-red-700"> Linkedin</span>
            </a>{" "}
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
