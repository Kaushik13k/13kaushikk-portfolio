import LeftSidebar from "./LeftSideBar";
import RightSidebar from "./RightSideBar";
import gtaImage from "../assets/gta5.jpg";
import MarkdownRenderer from "../components/MarkdownRenderer";
import Image from "next/image";
import Navbar from "../home/sections/Navbar";
import Footer from "../home/sections/Footer";

const markdownContent = `
## Features-1
Hello world. Hello world. Hello world. Hello world. Hello world. Hello world.
### Features-2
#### Features-3
##### Features-3

- Easy to use
- Highly customizable
- Works with Tailwind CSS

Here is a [link](https://example.com) to an external site.
~~~js
const aJsVariable = "Test";

console.log(aJsVariable);
~~~
`;

function App() {
  const extractHeadings = (content: string): string[] => {
    const regex = /^(#{1,6})\s*(.+)$/gm; // Match all heading levels (1 to 6)
    const matches = content.match(regex);

    if (matches) {
      return matches.map((match) => match.replace(/^(#{1,6})\s*/, "")); // Remove the `#` and spaces
    }

    return [];
  };

  const note =
    "Note: This blog is a work in progress. The project is still being built, and some sections are yet to be completed.";

  return (
    <div className="relative bg-white text-black">
      <div className="sm:px-10 lg:mx-28">
        <Navbar />
      </div>

      <div className="lg:flex lg:justify-between">
        <div className="block lg:hidden px-4 py-6">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow-md">
            <p className="text-yellow-700 text-sm mt-2">{note}</p>
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/4">
          <LeftSidebar note={note} />
        </div>

        <div className="px-4 py-8 sm:px-8 lg:px-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-left">
            Exploring the World&apos;s Largest Nature Reserve
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#676451] text-left">
            Dividing these deserts, the mountain range rises like a backbone
            across the landscape, with peaks reaching skyward and valleys that
            hide secret oases.
          </p>

          <p className="mt-2 text-xs sm:text-sm lg:text-base text-[#676451] text-left">
            Mar 16, 2024
          </p>

          <div className="flex justify-center items-center mt-8">
            <Image
              src={gtaImage}
              alt="Nature 1"
              className="object-cover w-full sm:w-3/4 lg:w-1/2"
            />
          </div>

          <div className="mt-8">
            <MarkdownRenderer content={markdownContent} />
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/4">
          <RightSidebar items={extractHeadings(markdownContent)} />
        </div>
      </div>

      <div className="block lg:hidden px-4 py-6">
        <div className="mt-6">
          <RightSidebar items={extractHeadings(markdownContent)} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
