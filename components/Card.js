import React from "react";

const Card = ({ imageSrc, heading, description, backgroundColor }) => {
  const cardStyle = {
    backgroundColor: backgroundColor || "#b3c6ff",
  };

  return (
    <div className="cardact wrap-hub-item" style={cardStyle}>
      <div className="image-container">
        <img src={imageSrc} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h2>{heading}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
