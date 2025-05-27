import React from "react";
import { useNavigate } from "react-router-dom";
import PlantForm from "../components/PlantForm";

// this page renders PlantForm, handles its own form state and submission (calls addPlant)

function AddPlant({ addPlant }) {
  // addPlant is defined in Home (POST)
  const navigate = useNavigate();
  // wraps the addPlant so that it redirects on success

  const handleAdd = async (newPlant) => {
    // handleAdd awaits for network request
    await addPlant(newPlant); //
    navigate("/"); // goes back to list
  };

  return (
    <div>
      <h2>Add New Plant</h2>
      {/* PlantForm calls handleAdd(newPlant) on submit */}
      <PlantForm onSubmit={handleAdd} />
    </div>
  );
}

export default AddPlant;
