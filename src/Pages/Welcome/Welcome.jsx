import React, { useEffect, useState } from "react";
import "./Welcome.css";
import OuterNavbar from "../../components/OuterNavbar/OuterNavbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";
import Footer from "../../components/Footer/Footer";

const Test = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        console.log(config.apiPoint.home);
        const req = await fetch(config.apiPoint.home, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (req.status === 401) {
          console.log("UnAuth");
          navigate("/signin");
        }

        if (req.ok) {
          const response = await req.json();
          console.log(response);
          setLoading(false);
          setApiData(response);
        }

        console.log(req.status);
      } catch (error) {
        console.log(error);
        fetchApi();
      }
    };

    fetchApi();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <OuterNavbar isUser={true} />
      <div className="box">
        <div className="current">
          <h1>Welcome</h1>
        </div>
        <TitleCards
          Title={"Now Playing"}
          apiData={apiData[0]}
          Category={"movie"}
        />
        <TitleCards Title={"Popular"} apiData={apiData[1]} Category={"movie"} />
        <TitleCards
          Title={"Top Rated"}
          apiData={apiData[2]}
          Category={"movie"}
        />
      </div>
      <Footer />
    </>
  );
};

export default Test;
