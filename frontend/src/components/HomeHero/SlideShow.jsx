import React, { useEffect, useState } from "react";
import "./SlideShow.css";

const SlideShow = ({ data }) => {
  const images = [
    {
      url: "https://image.tmdb.org/t/p/w500/b85bJfrTOSJ7M5Ox0yp4lxIxdG1.jpg",
      title: "Title 1",
      description: "Description for image 1.",
    },
    {
      url: "https://image.tmdb.org/t/p/w500/v9Du2HC3hlknAvGlWhquRbeifwW.jpg",
      title: "Title 2",
      description: "Description for image 2.",
    },
    {
      url: "https://image.tmdb.org/t/p/w500/xZm5YUNY3PlYD1Q4k7X8zd2V4AK.jpg",
      title: "Title 3",
      description: "Description for image 3.",
    },
    {
      url: "https://image.tmdb.org/t/p/w500/fYnEbgoNCxW9kL0IgOgtJb9JTBU.jpg",
      title: "Title 4",
      description: "Description for image 4.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slides every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="slideshow-container">
      <div className="slide" key={currentIndex}>
        <img src={images[currentIndex].url} alt={`Slide ${currentIndex + 1}`} />
        <div className="overlay">
          <h1>{images[currentIndex].title}</h1>
          <p>{images[currentIndex].description}</p>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
