import React, { useState } from "react";
import "./PlantCard.css";
import { useNavigate } from "react-router-dom";

// this component is for display and delete/edit buttons only

function PlantCard({ plant, onDelete }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id, name, type, interval } = plant;

  // helper for deleting with error capture
  const handleDelete = async () => {
    try {
      await onDelete(plant.id);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = () => navigate(`/edit/${plant.id}`);

  return (
    <div className="plant-card">
      {/* view: show name + Edit/Delete */}
      <h3>{name}</h3>
      <p>{type}</p>
      <p>Watered every {interval} days</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default PlantCard;
