import React from "react";
import styles from "./css/home.module.css";

export default function Paginado({ gamesPerPage, gamesFinded, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(gamesFinded / gamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav className={styles.navpanel}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <button
                className={styles.navpanelbutton}
                key={number}
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            );
          })}
      </ul>
    </nav>
  );
}
