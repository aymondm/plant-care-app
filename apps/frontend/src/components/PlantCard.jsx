import React, { useState } from "react";
import "./PlantCard.css";

function PlantCard({ plant, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false); // tracks whether plant name is being edited
  const [editedName, setEditedName] = useState(plant.name); // tracks new plant name
  const [editedType, setEditedType] = useState(plant.type); // tracks new plant type
  const [editedInterval, setEditedInterval] = useState(plant.interval); // tracks new plant interval
  const [error, setError] = useState("");

  // helper for saving changes with error capture
  const handleSave = async () => {
    try {
      await onUpdate(
        plant.id,
        editedName,
        editedType,
        parseInt(editedInterval, 10)
      );
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // helper for deleting with error capture
  const handleDelete = async () => {
    try {
      await onDelete(plant.id);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="plant-card">
      {isEditing ? (
        <>
          {/* edit : show input + Save/Cancel buttons*/}
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedType}
            onChange={(e) => setEditedType(e.target.value)}
          />
          <input
            type="number"
            value={editedInterval}
            onChange={(e) => setEditedInterval(e.target.value)}
          />
          {/* <button
            disabled={
              !editedName.trim() ||
              !editedType.trim() ||
              !parseInt(editedInterval, 10) > 0
            }
            onClick={() => {
              onUpdate(
                plant.id,
                editedName,
                editedType,
                parseInt(editedInterval, 10)
              );
              setIsEditing(false);
            }}
          >
            Save
          </button> */}
          <button
            disabled={
              !editedName.trim() ||
              !editedType.trim() ||
              !(parseInt(editedInterval, 10) > 0)
            }
            onClick={handleSave}
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditedName(plant.name);
              setEditedType(plant.type);
              setEditedInterval(plant.interval);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
          {error && <p>{error}</p>}
        </>
      ) : (
        <>
          {/* view: show name + Edit/Delete */}
          <h3>{plant.name}</h3>
          <p>{plant.type}</p>
          <p>Watered every {plant.interval} days</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
}

export default PlantCard;
