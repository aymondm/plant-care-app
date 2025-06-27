import React, { useState, useEffect } from "react";

// this component is a reusable form for name/type/watering interval (handles add & update)

function PlantForm({
  onSubmit,
  initialName = "",
  initialType = "",
  initialWateringInterval = "",
  clearOnSubmit = true,
}) {
  // initializes state from props
  const [plantName, setPlantName] = useState(initialName);
  const [plantType, setPlantType] = useState(initialType);
  const [wateringInterval, setWateringInterval] = useState(
    initialWateringInterval
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // trackers when the form is submitting to disable the submit button
  const [error, setError] = useState(null); // holds any error message to submit under the inputs

  // if initial props change on edit, update them into state
  useEffect(() => {
    setPlantName(initialName);
    setPlantType(initialType);
    setWateringInterval(initialWateringInterval);
    setError(null); // clears any leftover error if initial data changes
  }, [initialName, initialType, initialWateringInterval]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page refresh
    setError(null); // clears errors
    setIsSubmitting(true);

    try {
      await onSubmit({
        // handles POST and updates the plant list
        name: plantName,
        type: plantType,
        watering_interval: wateringInterval,
      });
      // only clear if adding plant
      if (clearOnSubmit) {
        setPlantName(""); // clears input
        setPlantType("");
        setWateringInterval("");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="plant-form">
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={plantName} // stores user input in plantName
        onChange={(e) => setPlantName(e.target.value)} // passes user input to setPlantName
        placeholder="Enter plant name"
        required
      />
      <label htmlFor="type">Type:</label>
      <input
        id="type"
        type="text"
        value={plantType}
        onChange={(e) => setPlantType(e.target.value)}
        placeholder="Enter plant type"
        required
      />
      <label htmlFor="interval">Water:</label>
      <input
        id="interval"
        type="number"
        min="1"
        value={wateringInterval}
        onChange={(e) => setWateringInterval(e.target.valueAsNumber)}
        placeholder="Every x days"
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
          typeof wateringInterval !== "number" ||
          wateringInterval < 1
        }
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default PlantForm;
