import "./App.css";
import Footer from "./sections/Footer";
import Body from "./sections/Body";
import Navbar from "./sections/Navbar";
import Projects from "./sections/Projects";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Body />

      <Projects />
      <Footer />
    </div>
  );
};

export default Home;
