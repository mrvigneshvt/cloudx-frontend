import React, { useEffect, useRef } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ Title, Category, apiData }) => {
  const cardsRef = useRef();

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY > 0 ? 100 : -100; // Adjust scroll speed
  };

  useEffect(() => {
    const currentRef = cardsRef.current;

    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const unAvailable = "https://i.ibb.co/Y7rfghSy/Not-found.webp";
  //console.log(apiData[0]);

  return (
    <div className="title-cards">
      <h2 className="Title">{Title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, i) => {
          return (
            <Link
              to={`/embeddedId/${Category}/${card.id}`}
              className="card"
              key={i}
            >
              <img
                src={card.poster.endsWith("null") ? unAvailable : card.poster}
                alt="img"
              ></img>
              <p>{card.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
