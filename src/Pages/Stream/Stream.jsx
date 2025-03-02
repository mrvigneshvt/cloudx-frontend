import "./Stream.css";
import Loader from "../../components/loader/Loader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterNavbar from "../../components/OuterNavbar/OuterNavbar";
import { config } from "../../../config";
import Footer from "../../components/Footer/Footer";

const Stream = () => {
  const { uniqueId, embedId } = useParams();

  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiStreamUrl, setApiStreamUrl] = useState(null);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const request = await fetch(config.apiPoint.openXfile + uniqueId, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (request.status === 404) {
          setPageNotFound(true);
          console.log("You are lost");
          return;
        }

        if (request.status === 401) {
          console.log("UnAuth");
          navigate("/signin");
          return;
        }

        if (request.ok) {
          const response = await request.json();
          console.log(response);
          setApiStreamUrl(response?.data || response);
          setApiSuccess(true);
        } else {
          console.log(request.status, "///////", request.statusText);
        }
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };

    handleFetch();
  }, [uniqueId]);

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const request = await fetch(config.apiPoint.getMovieInfo + embedId, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (request.ok) {
          const response = await request.json();
          console.log(response);
          setApiData(response);
        } else {
          console.log(request.status, "//////", request.statusText);
        }
      } catch (error) {
        console.error("Movie info fetch error:", error);
      }
    };

    getMovieInfo();
  }, [embedId]);
  const handleWatchOnline = () => {
    console.log(apiStreamUrl);
    if (apiStreamUrl) {
      // Clipboard fallback for mobile
      const tempInput = document.createElement("input");
      tempInput.value = apiStreamUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      setPopupMessage(
        "Streaming URL Copied! Paste it in the 'Network' section of any video player.\n\nNOTE: Video Can't Play in Browser Due to Browser Limitation Fragmentation"
      );
      setTimeout(() => setPopupMessage(""), 10000);
    }
  };

  const handleDownload = () => {
    if (apiStreamUrl) {
      window.location.href = apiStreamUrl;
    }
  };

  if (pageNotFound) {
    return <h2 className="error-text">404 - Page Not Found</h2>;
  }

  if (!apiSuccess || !apiData) {
    return <Loader />;
  }

  return (
    <>
      <OuterNavbar isUser={true} />
      <div className="stream-container">
        <div className="stream-card">
          <div className="stream-header">
            <h2>Thanks for Using from Cloud X</h2>
          </div>
          <div className="stream-body">
            <img
              src={apiData.poster_path}
              alt="Movie Poster"
              className="poster"
            />
            <div className="movie-details">
              <p>
                <strong>File Name:</strong> {apiData.title}
              </p>
              <p>
                <strong>File Release:</strong> {apiData.release_date}
              </p>
            </div>
          </div>
          <div className="stream-footer">
            <button className="watch-online-btn" onClick={handleWatchOnline}>
              Watch Online
            </button>
            <button className="download-btn" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      </div>

      {popupMessage && (
        <div className="popup-overlay">
          <div className="popup">{popupMessage}</div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Stream;
