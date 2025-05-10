import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import PlantForm from "../components/PlantForm";

function Home() {
  // initializes plants with an empty array and the loading/erorr states
  const [plants, setPlants] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetches plant list (wrapped in useEffect and [] so that it only runs once when the component mounts)
  useEffect(() => {
    const loadPlants = async () => {
      // defines async helper function, returns a promise object
      setLoading(true); // show loading state
      try {
        const res = await fetch("http://127.0.0.1:5000/api/plants"); // makes GET network request and waits for it
        if (!res.ok) throw new Error("Failed to load plants"); // if the server responds with an error status throw to jump to catch
        const data = await res.json(); // gets the JSON and waits for it
        setPlants(data); // puts the received data into state
        setError(null); // clears error
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // turn off loading
      }
    };

    loadPlants(); // run the async function
  }, []);

  // function called by PlantForm: wires up React addplant to POST.
  // Sends new plant to server, then updates state with the response
  const addPlant = async (newPlant) => {
    const res = await fetch("http://127.0.0.1:5000/api/plants", {
      // pause until the promise resolves
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    });
    if (!res.ok) {
      // error check (true for 200-299)
      throw new Error("Failed to add plant");
    }
    const newPlant = await res.json(); // pause until res.json (response body sent by backend) promise resolves
    setPlants((prev) => [...prev, newPlant]); // update the state when data is available
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
