import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import PlantForm from "../components/PlantForm";

function Home() {
  // initializes plants with an empty array and the loading/erorr states
  const [plants, setPlants] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  // fetches plant list (once on mount)
  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/api/plants")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load plants");
        return res.json();
      })
      .then((data) => {
        setPlants(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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
        plant.id === id
          ? { ...plant, name: newName, type: newType, interval: newInterval }
          : plant
      )
    );
  };

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error}</p>;

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
