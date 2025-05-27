import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import PlantForm from "../components/PlantForm";

// this page reads the :id from the URL, loads that plant's data, populates the form, and calls updatePlant

function EditPlant({ plants, updatePlant, loading }) {
  const { id } = useParams(); // grabs the id from the URL (/edit/:id)
  const plantId = Number(id);
  const navigate = useNavigate();

  if (loading) return <p>Loading</p>; // if plants have not been fetched yet

  const plant = plants.find((plant) => plant.id === plantId); // find the plant from props that needs to be edited

  if (!plant) {
    // if plants have been fetched but plant to be edited is not found
    return <Navigate to="*" replace />;
  }

  // called by the form on submit
  const handleUpdate = async (data) => {
    await updatePlant(plantId, data.name, data.type, data.interval);
    navigate("/"); // goes back home
  };

  return (
    <div>
      <h2>Edit Plant {plantId}</h2>
      {/* pass plant's initial data into the form so it pre-fills */}
      <PlantForm
        initialName={plant.name}
        initialType={plant.type}
        initialInterval={plant.interval}
        onSubmit={handleUpdate}
        clearOnSubmit={false} // doesn't clear the form when a user saves on edit
      />
    </div>
  );
}

export default EditPlant;
