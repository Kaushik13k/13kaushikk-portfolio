import { useEffect, useState } from "react";

const messages = [
  "Hello",
  "Namaste",
  "Hola",
  "Bonjour",
  "Welcome to my Profile! ...",
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
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  // const handleTransition = () => {
  //   // Handle button click logic here
  // };

  return (
    <div className="bg-black text-white font-salsa font-bold flex items-center justify-center h-screen m-0">
      <div className="text-container relative w-1/2 flex items-center justify-center text-2xl">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`absolute transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {message}
          </p>
        ))}
        {/* <button 
                    className={`mt-5 px-12 py-3 bg-white text-black border-none cursor-pointer text-lg rounded-2xl hover:scale-105 transition-transform duration-200`} 
                    onClick={handleTransition}
                    disabled={!isFinished} // Disable the button if not finished
                >
                    Lets Gooo ...
                </button> */}
      </div>
    </div>
  );
};

export default App;
