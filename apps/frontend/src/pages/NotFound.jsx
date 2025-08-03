import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <h2 className={styles.code}>404</h2>
      <p className={styles.message}>Oops! Page not found.</p>
    </div>
  );
}

export default NotFound;
