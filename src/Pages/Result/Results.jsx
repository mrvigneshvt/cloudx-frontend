import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OuterNavbar from "../../components/OuterNavbar/OuterNavbar";
import { TrendingUp, TrendingDown } from "lucide-react"; // Icons for popularity
import "./Results.css"; // Import Vanilla CSS
import Loader from "../../components/loader/Loader";
import { config } from "../../../config";
import Footer from "../../components/Footer/Footer";

const Results = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const { query } = useParams();

  useEffect(() => {
    const handleApi = async () => {
      try {
        console.log("Request firing...");
        const request = await fetch(config.apiPoint.fetchQuery + query, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (request.status === 401) {
          console.log("UnAuth");
          navigate("/signin");
          return;
        }
        if (request.status === 200) {
          const response = await request.json();
          setData(response);
          setNotFound(false);
        } else if (request.status === 404) {
          setNotFound(true);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    handleApi();
  }, [query]);

  // Handle click event
  const handleClick = (id) => {
    navigate(`/embeddedId/movie/${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <OuterNavbar isUser={true} />
      <div className="results-container">
        <h1 className="results-title">Search results for: {query}</h1>

        {notFound ? (
          <div className="results-not-found">
            No results found for "{query}".
          </div>
        ) : (
          <div className="results-grid">
            {data.map((movie) => (
              <div
                key={movie.id}
                className="results-card"
                onClick={() => handleClick(movie.id)}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="results-poster"
                />
                <div className="results-info">
                  <h2 className="results-movie-title">{movie.title}</h2>
                  <p className="results-release-year">
                    {movie.releaseYear || "N/A"}
                  </p>
                  <div className="results-popularity">
                    {movie.popular ? (
                      <TrendingUp size={18} className="results-icon up" />
                    ) : (
                      <TrendingDown size={18} className="results-icon down" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Results;
