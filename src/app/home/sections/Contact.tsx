import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col" id="portfolio-contact">
      <div className="flex justify-start items-center p-4 lg:mx-60 mb-12">
        <div className="w-[1300px]">
          <h3 className="text-2xl font-extrabold text-[#22200F]">
            {" "}
            Get in touch
          </h3>

          <p className="text-sm text-[#83816D] pt-2">
            Do you have an idea you'd like to discuss? Feel free to reach me at
            <a href="#">
              <span className="text-red-700"> hello@kaushik13k.com</span>
            </a>{" "}
            . You can also find me on ,
            <a href="#">
              <span className="text-red-700"> Twitter,</span>
            </a>{" "}
            <a href="#">
              <span className="text-red-700"> Github</span>
            </a>{" "}
            and{" "}
            <a href="#">
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
