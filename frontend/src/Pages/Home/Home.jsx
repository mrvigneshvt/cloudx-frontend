import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OuterNavbar from "../../components/OuterNavbar/OuterNavbar";
import "./Home.css";
import { config } from "../../../config";
import Footer from "../../components/Footer/Footer";

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
      <div className="content-container">
        <div className="info-box">
          {!working ? (
            <>
              <h1 className="section-title">What is</h1>
              <h2 className="main-title">Cloud X</h2>
              <p className="description">
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
              <h1 className="section-title">How is</h1>
              <h2 className="main-title">Cloud X</h2>
              <p className="description">
                usess Open-source private engine called "Open-X" aggregates
                publicly available data from diverse online sources, including
                web pages, social media, and torrent networks, facilitating
                simultaneous download and streaming. Operating solely on
                publicly accessible information, the engine does not store or
                save any data. It serves as a research and exploration platform
                for open-source data aggregation methods, intended for personal
                use only.
              </p>
            </>
          )}
          <div className="button-container">
            <button onClick={handleWorking} className="toggle-button">
              {!working ? "How it Works" : "What is Cloud X"}
            </button>
            <button className="get-started-button">Get Started</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
