import React, { useState } from "react";
import "./PlantCard.css";

function PlantCard({ plant, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false); // tracks whether plant name is being edited
  const [editedName, setEditedName] = useState(plant.name); // tracks new plant name

  return (
    <div className="plant-card">
      {isEditing ? (
        <>
          {/* edit : show input + Save/Cancel */}
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button
            onClick={() => {
              onUpdate(plant.id, editedName);
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditedName(plant.name);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          {/* view: show name + Edit/Delete */}
          <h3>{plant.name}</h3>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(plant.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default PlantCard;
