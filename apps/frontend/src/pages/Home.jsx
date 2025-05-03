import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import PlantForm from "../components/PlantForm";

function Home() {
  // initialize plants with stored data (or default)
  const [plants, setPlants] = useState(() => {
    // runs only once on mount
    const stored = localStorage.getItem("plants");
    if (stored) {
      return JSON.parse(stored);
    }
    return [
      { id: 1, name: "Monstera", type: "Monstera deliciosa" },
      { id: 2, name: "Pothos", type: "Epipremmum aureum" },
      { id: 3, name: "Cactus", type: "Carnegiea gigantea" },
    ];
  });

  // whenever plants are changed, save them to localStorage
  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  // function called by PlantForm
  const addPlant = (newPlant) => {
    setPlants((currentPlants) => [...currentPlants, newPlant]);
  };

  const removePlant = (id) => {
    setPlants((currentPlants) =>
      currentPlants.filter((plant) => plant.id !== id)
    );
  };

  const updatePlant = (id, newName) => {
    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === id ? { ...plant, name: newName } : plant
      )
    );
  };

  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="home">
      <h2>Plants</h2>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} // updates search input
        placeholder="Search plants"
      />
      <PlantForm addPlant={addPlant} />
      {/* renders PlantForm child component */}
      {plants
        .filter((plant) =>
          plant.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onDelete={removePlant}
            onUpdate={updatePlant}
          />
        ))}
    </div>
  );
}

export default Home;
