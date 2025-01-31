import React, { useEffect, useState } from "react";
import "./Loader.css";

const Loader = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="loader-container">
      <div className="spinner">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
      </div>

      {showButton && (
        <>
          <label className="loader-label">
            Press the button if you see this Text
          </label>
          <button onClick={handleReload} className="reload-button">
            Reload
          </button>
        </>
      )}
    </div>
  );
};

export default Loader;
