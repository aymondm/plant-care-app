import React, { useState } from "react";

function PlantForm({ addPlant }) {
  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [waterInterval, setWaterInterval] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(""); // trackers when the form is submitting to disable the submit button
  const [error, setError] = useState(""); // holds any error message to submit under the inputs

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page refresh
    setError(null); // clears errors
    setIsSubmitting(true);

    try {
      await addPlant({ // handles POST and updates the plant list
        name: plantName,
        type: plantType,
        interval: parseInt(waterInterval, 10), // converts user input to base-10 integer
      }); //
      setPlantName(""); // clears input
      setPlantType("");
      setWaterInterval("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
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
      {/* Shows error message if something goes wrong */}
      {error && <p className="error">{error}</p>}
      <button
        type="submit"
        disabled={
          isSubmitting ||
          !plantName.trim() ||
          !plantType.trim() ||
          !(parseInt(waterInterval, 10) > 0)
        }
      >
        {isSubmitting ? "Adding..." : "Add Plant"}
      </button>
    </form>
  );
}

export default PlantForm;
