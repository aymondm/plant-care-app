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
      { id: 1, name: "Monstera", type: "Monstera deliciosa", interval:3 },
      { id: 2, name: "Pothos", type: "Epipremmum aureum", interval:1 },
      { id: 3, name: "Cactus", type: "Carnegiea gigantea", interval:2 },
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

  const updatePlant = (id, newName, newType, newInterval) => {
    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === id ? { ...plant, name: newName, type: newType, interval:newInterval } : plant
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
