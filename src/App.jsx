import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/login/Login";
import Welcome from "./Pages/Welcome/Welcome";

import Embeded from "./Pages/Embeded/Embeded";
import Results from "./Pages/Result/Results";
import Stream from "./Pages/Stream/Stream";
import NotFound from "./Pages/Not Found/NotFound";

function App() {
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
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
