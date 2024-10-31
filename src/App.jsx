import "./App.css";
import Home from "./Home";
import BlogListing from "./BlogListing";
import Welcome from "./sections/Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// TODO:
// 1. Have set the margin for everything in each sections. make it in one place
const App = () => {
  return (
    <Router>
      <div className="bg-gradient-to-b from-soft-beige to-white">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog-listing" element={<BlogListing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
