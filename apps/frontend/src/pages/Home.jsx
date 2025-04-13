import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";

function Home() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const samplePlants = [
      { id: 1, name: "Monstera" },
      { id: 2, name: "Pothos" },
      { id: 3, name: "Cactus" },
    ];
    setPlants(samplePlants);
  }, []);

  return (
    <div className="home">
      <h2>Plants</h2>
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
}

export default Home;
