import React, { useState } from "react";

function PlantForm({ addPlant }) {
  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [waterInterval, setWaterInterval] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page refresh

    // checks for valid input
    addPlant({
      // addPlant is called to add the new plant to the list
      id: Date.now(),
      name: plantName,
      type: plantType,
      interval: parseInt(waterInterval, 10) // converts user input to base-10 integer
    }); //
    setPlantName(""); // clears input
    setPlantType("");
    setWaterInterval("");
  };

  return (
    <form onSubmit={handleSubmit} className="plant-form">
      <input
        type="text"
        value={plantName} // stores user input in plantName
        onChange={(e) => setPlantName(e.target.value)} // passes user input to setPlantName
        placeholder="Enter plane name"
        required
      />
      <input
        type="text"
        value={plantType}
        onChange={(e) => setPlantType(e.target.value)}
        placeholder="Enter plant type"
        required
      />
      <input
        type="number"
        min="1"
        value={waterInterval}
        onChange={(e) => setWaterInterval(e.target.value)}
        placeholder="Water every x days"
        required
      />
      <button
        type="submit"
        disabled={
          !plantName.trim() ||
          !plantType.trim() ||
          !(parseInt(waterInterval, 10) > 0)
        }
      >
        Add Plant
      </button>
    </form>
  );
}

export default PlantForm;
