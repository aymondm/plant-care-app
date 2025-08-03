import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import PlantForm from "../components/PlantForm";
import styles from "./EditPlant.module.css";

// this page reads the :id from the URL, loads that plant's data, populates the form, and calls updatePlant

function EditPlant({ updatePlant }) {
  const { id } = useParams(); // grabs the id from the URL (/edit/:id)
  const navigate = useNavigate();

  const [initialName, setInitialName] = useState("");
  const [initialType, setInitialType] = useState("");
  const [initialWateringInterval, setInitialWateringInterval] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetches plant (wrapped in useEffect and [] so that it only runs once when the component mounts)
  useEffect(() => {
    const loadPlant = async () => {
      // defines async helper function, returns a promise object
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/plants/${id}`); // makes GET network request and waits for it
        if (!res.ok) throw new Error("Failed to load plant"); // if the server responds with an error status throw to jump to catch
        const plant = await res.json(); // gets the JSON and waits for it
        setInitialName(plant.name);
        setInitialType(plant.type);
        setInitialWateringInterval(plant.watering_interval);
        setError(null); // clears error
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // turns off loading
      }
    };

    loadPlant(); // runs the async function
  }, [id]);

  // called by the form, handler to submit the updated plant
  const handleUpdate = async (updatedFields) => {
    await updatePlant(id, updatedFields);
    navigate("/"); // goes back home
  };

  if (loading) return <p>Loading plant...</p>;
  if (error) return <Navigate to="*" replace />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>EDIT PLANT</h2>
        {/* pass plant's initial data into the form so it pre-fills */}
        <PlantForm
          initialName={initialName}
          initialType={initialType}
          initialWateringInterval={initialWateringInterval}
          onSubmit={handleUpdate}
          clearOnSubmit={false} // doesn't clear the form when a user saves on edit
        />
      </div>
    </div>
  );
}

export default EditPlant;
