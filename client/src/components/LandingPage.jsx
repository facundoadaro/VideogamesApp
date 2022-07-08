import React from "react";
import { Link } from "react-router-dom";
import styles from './css/landingpage.module.css';

export default function LandingPage() {

  return (
    <div className={styles.first}>
      <div>
      <h1 className={styles.h1}>Welcome to the Videogames App!</h1>
      <Link to="/home">
        <button className={styles.button}>Access</button>
      </Link>
      </div>
    </div>
  );
}
