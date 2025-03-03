import React, { useEffect, useState } from "react";
import "./Embeded.css";
import OuterNavbar from "../../components/OuterNavbar/OuterNavbar";
import { LuThumbsUp } from "react-icons/lu";
import { FaRegThumbsDown } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import WatchOnline from "../../components/watchOnline/WatchOnline";
import { config } from "../../../config";
import Footer from "../../components/Footer/Footer";

const Embeded = () => {
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [fileApi, setFileApi] = useState(false);
  const [fileAvailable, setFileAvailable] = useState(false);
  const [streamData, setStreamData] = useState([]);
  const [showLinks, setShowLinks] = useState(false);

  const { id } = useParams();
  console.log(id);

  const showStream = () => {
    if (streamData.length > 0) {
      setShowLinks(!showLinks);
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const req = await fetch(config.apiPoint.getMovieInfo + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (req.status === 401) {
          console.log("UnAuth");
          navigate("/signin");
          return;
        }

        if (req.ok) {
          const response = await req.json();
          setApiSuccess(true);
          setApiData(response);
          console.log("API Data:", response);
        } else {
          console.error("Error fetching movie info:", req.statusText);
        }
      } catch (error) {
        console.error("Fetch API Error:", error);
      }
    };

    fetchApi();
  }, [id]);

  useEffect(() => {
    if (!apiData) return; // Prevent running fetchFile until apiData is available

    const fetchFile = async () => {
      try {
        console.log(apiData);
        console.log("Fetching file for:", apiData.title);
        const cleanFileName =
          apiData.title
            .replace(/[\s,.]+/g, "_")
            .replace(/[^a-zA-Z0-9_]/g, "")
            .replace(/_+/g, "_")
            .replace(/^_+|_+$/g, "") +
          "_" +
          apiData.release_date.slice(0, 4);

        console.log("Cleaned File Name:", cleanFileName);

        console.log(
          config.apiPoint.fileAvailable + cleanFileName,
          "eppppppppp",
        );
        const req = await fetch(config.apiPoint.fileAvailable + cleanFileName, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        console.log(req);

        console.log(req.status);

        if (req.status === 401) {
          console.log("UnAuth");
          navigate("/signin");
          return;
        }

        if (req.ok) {
          setFileApi(true);
          const response = await req.json();
          setFileAvailable(true);
          console.log("File API Response:", response);
          setStreamData(response);
        } else {
          console.error("Error fetching file info:", req.statusText);
        }
      } catch (error) {
        console.error("Fetch File Error:", error);
      }
    };

    fetchFile();
  }, [apiData]); // Dependency on apiData to trigger fetchFile when apiData is available

  if (!apiSuccess) {
    return <Loader />;
  }

  return (
    <>
      <OuterNavbar isUser={true} />

      <div className="embed-page">
        <div className="embed-container">
          <div className="img-container">
            <img
              className="poster"
              src={apiData.poster_path}
              alt="Movie Poster"
            />
          </div>
          <div className="details-container">
            <div className="info">
              <div className="info-row">
                <h1>Title:</h1>
                <h2>{apiData.title}</h2>
              </div>
              <div className="info-row">
                <h1>Genres:</h1>
                <h2>{apiData.genres.map((genre) => genre.name).join(", ")}</h2>
              </div>
              <div className="info-row">
                <h1>Ratings:</h1>
                <h2>{apiData.vote_average}</h2>
              </div>
              <div className="info-row">
                <h1>Average:</h1>
                <h2>
                  {apiData.vote_average > 6 ? (
                    <LuThumbsUp className="thumb" />
                  ) : (
                    <FaRegThumbsDown className="thumb" />
                  )}
                </h2>
              </div>
              <div className="info-row">
                <h1>Story:</h1>
                <h2 className="overview">{apiData.overview}</h2>
              </div>
            </div>

            <div className="availability">
              <div className="availability-label">
                <h1>File Availability:</h1>
              </div>
              <button
                onClick={() => showStream()}
                className={`availability-btn ${
                  fileAvailable ? "available" : "unavailable"
                }`}
              >
                {fileAvailable ? "Watch Online" : "Unavailable"}
              </button>
            </div>
          </div>
          {showLinks ? (
            <WatchOnline streamingData={streamData} embedId={id} />
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Embeded;
