import React, { useState } from "react";
import "./PlantCard.css";

function PlantCard({ plant, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false); // tracks whether plant name is being edited
  const [editedName, setEditedName] = useState(plant.name); // tracks new plant name
  const [editedType, setEditedType] = useState(plant.type); // tracks new plant type
  const [editedInterval, setEditedInterval] = useState(plant.interval); // tracks new plant interval

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
          <button
            disabled={!editedName.trim() || !editedType.trim() || !editedInterval}
            onClick={() => {
              onUpdate(plant.id, editedName, editedType, editedInterval);
              setIsEditing(false);
            }}
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
        </>
      ) : (
        <>
          {/* view: show name + Edit/Delete */}
          <h3>{plant.name}</h3>
          <p>{plant.type}</p>
          <p>Watered every {plant.interval} days</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(plant.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default PlantCard;
