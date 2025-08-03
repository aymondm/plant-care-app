import React, { useState } from "react";
import styles from "./PlantCard.module.css";
import { useNavigate } from "react-router-dom";

// this component is for display and delete/edit buttons only

function PlantCard({ plant, onDelete }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id, name, type, watering_interval: wateringInterval } = plant;

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
    <div className={styles.card}>
      {/* view: show name + Edit/Delete */}
      <h3 className={styles.cardTitle}>{name}</h3>
      <p className={styles.cardSubtitle}>{type}</p>
      <p className={styles.cardInfo}>Water every {wateringInterval} days</p>
      <div className={styles.cardActions}>
        <button className={styles.button} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles.button} onClick={handleDelete}>
          Delete
        </button>
      </div> 
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default PlantCard;
