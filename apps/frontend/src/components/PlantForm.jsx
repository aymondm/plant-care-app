import React, { useState, useEffect } from "react";
import styles from "./PlantForm.module.css";
import { useRef } from "react";
import getUserId from "../utilities/userId";

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
  const [isFetchingInterval, setIsFetchingInterval] = useState(false);

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
        user_id: getUserId(),
      });
      // only clear if adding plant
      if (clearOnSubmit) {
        setPlantName(""); // clears input
        setPlantType("");
        setWateringInterval("");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const debounceRef = useRef(null);

  const handleTypeChange = async (e) => {
    const newType = e.target.value;
    setPlantType(newType);

    if (newType.trim().length < 3) return;

    setIsFetchingInterval(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const rest = await fetch(
          `http://127.0.0.1:5000/api/ai-interval?plant=${encodeURIComponent(
            newType
          )}`
        );
        const data = await rest.json();

        if (rest.ok && data.watering_interval) {
          setWateringInterval(Number(data.watering_interval));
        } else {
          console.error("API error:", data.error || "Unknown error.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsFetchingInterval(false);
      }
    }, 600); // delays by 600ms
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.group}>
        <label htmlFor="name"></label>
        <input
          id="name"
          type="text"
          value={plantName} // stores user input in plantName
          className={styles.input}
          onChange={(e) => setPlantName(e.target.value)} // passes user input to setPlantName
          placeholder="Name"
          required
        />
        <label htmlFor="type"></label>
        <input
          id="type"
          type="text"
          value={plantType}
          className={styles.input}
          onChange={handleTypeChange}
          placeholder="Type"
          required
        />
        <label htmlFor="interval"></label>
        <input
          id="interval"
          type="number"
          min="1"
          value={wateringInterval}
          className={styles.input}
          onChange={(e) => setWateringInterval(Number(e.target.valueAsNumber))}
          placeholder="Water Frequency"
          required
        />
      </div>
      {/* Shows error message if something goes wrong */}
      {error && <p className="error">{error}</p>}
      <button
        type="submit"
        className={styles.button}
        disabled={
          isSubmitting ||
          isFetchingInterval ||
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
