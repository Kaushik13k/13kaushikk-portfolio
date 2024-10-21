import "./App.css";
import Footer from "./sections/Footer";
import Navbar from "./sections/Navbar";
import Projects from "./sections/Projects";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Projects />
      <Footer />
    </div>
  );
};

export default Home;
