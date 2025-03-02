import react from "react";
import { useNavigate } from "react-router-dom";
import "./WatchOnline.css";

const WatchOnline = ({ streamingData, embedId }) => {
  const navigate = useNavigate();
  return (
    <div className="watch-on-container">
      {streamingData.map((item, index) => (
        <div
          key={index}
          className="watch-on-card"
          onClick={() => navigate(`/watch-online/${embedId}/${item.uniqueId}`)}
        >
          <div className="watch-on-play">▶</div>
          <div className="watch-on-details">
            <div className="watch-on-title">
              <p>{item.fileName}</p>
            </div>
            <div className="watch-on-size">
              <p>{item.fileSize}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchOnline;
