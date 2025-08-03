import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";

// this component displays the header and navigation for each page

function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>WaterMe</h1>
        <nav className={styles.nav}>
          <Link to="/">HOME</Link> <Link to="/add">ADD</Link>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet /> {/* renders whichever child route is active */}
      </main>
      <footer className={styles.footer}>
        © 2025 <span>WaterMe</span>
      </footer>
    </div>
  );
}

export default Layout;
