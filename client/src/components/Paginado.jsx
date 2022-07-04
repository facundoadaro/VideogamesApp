import React from "react";

export default function Paginado({ gamesPerPage, allGames, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <ul key={number}>
                <button onClick={() => paginado(number)}>{number}</button>
              </ul>
            );
          })}
      </ul>
    </nav>
  );
}
