import React, { useState } from "react";

function PlantForm({ addPlant }) {
  const [plantName, setPlantName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page refresh

    if (plantName.trim() !== "") { // checks for valid input
      addPlant({ id: Date.now(), name: plantName }); // addPlant is called to add plant to the list
      setPlantName(""); // clears input
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={plantName} // stores user input in plantName
        onChange={(e) => setPlantName(e.target.value)} // passes user input to setPlantName
        placeholder="Enter plane name"
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default PlantForm;
