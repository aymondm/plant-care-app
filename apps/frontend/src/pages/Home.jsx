import React, { useState } from "react";
import PlantCard from "../components/PlantCard";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

// this page displays the plants, and handles search, delete, and navigation to edit

function Home({ plants, removePlant }) {
  const [searchInput, setSearchInput] = useState("");
  const searchTerm = searchInput.toLowerCase();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>MY PLANTS</h2>
        <label htmlFor="search-input"></label>
        <input
          id="search-input"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // updates search input
          placeholder="Search Plants"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.plantList}>
        {plants
          .filter((plant) => plant.name.toLowerCase().includes(searchTerm))
          .map((plant) => (
            <PlantCard key={plant.id} plant={plant} onDelete={removePlant} />
          ))}
      </div>
    </div>
  );
}

export default Home;
