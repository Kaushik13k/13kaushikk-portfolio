import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const messages = [
  "Hello there!",
  "Namaste!",
  "¡Hola!",
  "Bonjour!",
  "Step into my profile",
];

const App = () => {
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
    <div className="bg-[#EFF0F3] text-gray-800 font-poppins flex items-center justify-center h-screen m-0 font-bold">
      <div className="text-container relative w-3/4 md:w-1/2 flex flex-col items-center justify-center text-xl md:text-2xl">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`absolute transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } text-center`}
          >
            {message}
            {index === messages.length - 1 && isFinished && (
              <div className="flex items-center justify-center mt-4">
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="ml-2 text-4xl text-gray-800 hover:text-gray-500 transition duration-300"
                />
                <span className="ml-2 text-gray-400 text-sm font-bold">
                  Click here!
                </span>
              </div>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
