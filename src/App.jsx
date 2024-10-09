import "./App.css";
import Navbar from "./sections/Navbar";
import Welcome from "./sections/Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="bg-gradient-to-b from-soft-beige to-white">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Navbar />} />
          {/* <div className="container mx-auto px-8">
            <Navbar />
          </div> */}
        </Routes>
        {/* <Welcome />; */}
      </div>
    </Router>
  );
};

export default App;
