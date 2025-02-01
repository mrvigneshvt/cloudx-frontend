import React, { useEffect } from "react";
import "./NotFound.css"; // Import the CSS file for styling and animation
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/welcome");
  }, 3000);
  return (
    <div className="notf-found-container">
      <div className="notf-found-box">
        <h1 className="notf-found-text">
          Wohooo! Looks Like You are Lost. Don't Worry, I'll Take Care..
        </h1>
        <div className="notf-found-loader"></div>
      </div>
    </div>
  );
};

export default NotFound;
