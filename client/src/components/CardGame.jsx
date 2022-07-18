import React from "react";
import styles from "./css/cardgame.module.css";

export default function CardGame({ name, image, genres }) {
  return (
    <div className={styles.allcont}>
      <div className={styles.showing}>
        <h3 className={styles.info3}>{name}</h3>
        <img src={image} className={styles.img} alt="img not found" width="325px" height="200px" />
        <h5 className={styles.info5}>{genres}</h5>
      </div>
    </div>
  );
}
