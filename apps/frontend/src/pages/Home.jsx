import React, { useState } from "react";
import PlantCard from "../components/PlantCard";
import { Link } from "react-router-dom";

// this page displays the plants, and handles search, delete, and navigation to edit

function Home({ plants, removePlant }) {
  const [searchInput, setSearchInput] = useState("");
  const searchTerm = searchInput.toLowerCase();

  return (
    <div className="home">
      <h2>Plants</h2>

      <label htmlFor="search-input">Search Plants:</label>
      <input
        id="search-input"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} // updates search input
        placeholder="Search plants"
      />

      <Link to="/add" className="add-button">
        Add Plant
      </Link>
      {plants
        .filter((plant) => plant.name.toLowerCase().includes(searchTerm))
        .map((plant) => (
          <PlantCard key={plant.id} plant={plant} onDelete={removePlant} />
        ))}
    </div>
  );
}

export default Home;
