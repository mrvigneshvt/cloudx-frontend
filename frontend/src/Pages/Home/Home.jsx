import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OuterNavbar from "../../components/OuterNavbar/OuterNavbar";
import "./Home.css";
import { config } from "../../../config";
const Home = () => {
  const navigate = useNavigate();
  const [working, setWorking] = useState(false);

  const handleWorking = () => {
    setWorking(!working);
  };
  return (
    <div className="home">
      <OuterNavbar home={true} />
      {/* Main Content */}
      <div className="cont">
        <div className="main-cont">
          {!working ? (
            <>
              <h1 className="how-what">What is</h1>
              <h1 className="title-primary">Cloud X</h1>
              <p className="desc-primary">
                Cloud X is a premium streaming platform offering on-demand
                access to a vast library of films and television. Leveraging a
                unique transactional model, Cloud X provides a flexible,
                personalized viewing experience without recurring subscriptions.
                Users enjoy granular control over their entertainment choices,
                selecting precisely what they want to watch. This innovative
                approach delivers a cost-effective and streamlined alternative
                to traditional streaming services.
              </p>
            </>
          ) : (
            <>
              <h1 className="how-what">How is</h1>

              <h1 className="title-secondary">Cloud X</h1>
              <p className="desc-secondary">
                Open-source private engine aggregates publicly available data
                from diverse online sources, including web pages, social media,
                and torrent networks, facilitating simultaneous download and
                streaming. Operating solely on publicly accessible information,
                the engine does not store or save any data. It serves as a
                research and exploration platform for open-source data
                aggregation methods, intended for personal use only.
              </p>
            </>
          )}
          <div className="sub-cont">
            {!working ? (
              <button onClick={() => handleWorking()}>How it Works</button>
            ) : (
              <button onClick={() => handleWorking()}>What is Cloud X</button>
            )}
            <button>Get Started</button>
          </div>
        </div>
        <div className="footer">
          <p>© 2025 Cloud X. All Rights yet to be Reserved.</p>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default Home;
