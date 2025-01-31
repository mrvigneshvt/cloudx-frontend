import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/login/Login";
import OuterNavbar from "./components/OuterNavbar/OuterNavbar";
import Welcome from "./Pages/Welcome/Welcome";
import Slideshow from "./components/HomeHero/SlideShow";
import Test from "./Pages/Test";
import Embeded from "./Pages/Embeded/Embeded";
import Results from "./Pages/Result/Results";
import WatchOnline from "./components/watchOnline/WatchOnline";
import Stream from "./Pages/Stream/Stream";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="/search/:query" element={<Results />}></Route>
        <Route path="/embeddedId/movie/:id" element={<Embeded />}></Route>
        <Route
          path="/watch-online/:embedId/:uniqueId"
          element={<Stream />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
