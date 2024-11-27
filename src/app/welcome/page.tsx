"use client";
import React, { useEffect, useState } from "react";
import { messages } from "@app/constants/greetings";
import CircleArrowRight from "./components/CircleArrowRight";

const Welcome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex + 1 === messages.length) {
          setIsFinished(true);
          clearInterval(timer);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [isFinished]);

  return (
    <div className="text-dark-brownish-black font-poppins flex items-center justify-center min-h-screen m-0 font-bold">
      <div className="text-container relative w-3/4 md:w-1/2 flex flex-col items-center justify-center text-xl md:text-2xl">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`absolute transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } text-center`}
          >
            {message}
            {index === messages.length - 1 && isFinished && (
              <CircleArrowRight guidedTest={true} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
