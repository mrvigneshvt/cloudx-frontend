import React, { useEffect, useState } from "react";
import "./Test.css";
import OuterNavbar from "../components/OuterNavbar/OuterNavbar";
import TitleCards from "../components/TitleCards/TitleCards";
import Loader from "../components/loader/Loader";

const Test = () => {
  const apiEndPoint = "http://localhost:5000/api/home";
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const req = await fetch(apiEndPoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (req.ok) {
          const response = await req.json();
          setLoading(false);
          setApiData(response);
          return;
        }
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
        <TitleCards
          Title={"Popular Series"}
          apiData={apiData[1]}
          Category={"tv"}
        />
        <TitleCards
          Title={"Top Rated"}
          apiData={apiData[2]}
          Category={"movie"}
        />
      </div>
    </>
  );
};

export default Test;
