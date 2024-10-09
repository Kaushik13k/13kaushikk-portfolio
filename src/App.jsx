import Welcome from "./sections/Welcome";
import Navbar from "./sections/Navbar";
import "./App.css";

const App = () => {
  return (
    <div className="bg-gradient-to-b from-soft-beige to-white">
      {/* <Welcome />; */}
      <div className="container mx-auto px-8">
        <Navbar />
      </div>
    </div>
  );
};

export default App;
