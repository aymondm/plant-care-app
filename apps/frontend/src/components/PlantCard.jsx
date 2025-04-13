import React from "react";
import "./PlantCard.css"; 

function PlantCard({ plant }) {
  return (
    <div className="plant-card">
      <h3>{plant.name}</h3>
    </div>
  );
}

export default PlantCard;
