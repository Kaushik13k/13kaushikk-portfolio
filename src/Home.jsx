import "./App.css";
import Footer from "./sections/Footer";
import Body from "./sections/Body";
import Navbar from "./sections/Navbar";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Blogs from "./sections/Blogs";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Body />
      <Projects />
      <Blogs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
