import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBy, orderBy, getGames } from "../actions/index.js";
import { Link } from "react-router-dom";
import CardGame from "./CardGame";
import Paginado from "./Paginado";
import NavBar from "./NavBar";
import Loading from "../multimedia/loading.gif"

export default function Home() {
  const dispatch = useDispatch(); // useDispatch manda la info necesaria a la constante dispatch para poder despachar las acciones

  const gamesFinded = useSelector((state) => state.games); // useSelector es un Hook que nos permite extraer datos del store de redux utilizando una función selectora (es análogo al mapStateToProps) -- en la constante guardo todo lo que tenga el state.games del

  // ------------------------------------------------
  //                MAPEO DE GENEROS
  const allGames = useSelector((state) => state.allGames);
  let genresMapped = new Set(
    allGames
      .map((g) => g.genres)
      .join(" - ")
      .split(" - ")
  );
  let genresDisplayed = [];
  for (let entry of genresMapped) {
    genresDisplayed.push(entry);
  }

  // ------------------------------------------------
  //                PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = useState(15);

  const lastGame = currentPage * gamesPerPage[0];
  const firstGame = lastGame - gamesPerPage[0];

  const currentGames = gamesFinded.slice(firstGame, lastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ------------------------------------------------

  const setOrder = useState("");

  useEffect(() => {
    setTimeout(function () {
      dispatch(getGames());
    }, 100);
  }, [dispatch]);

  function handleFilterStatus(e) {
    dispatch(filterBy(e.target.value));
    setCurrentPage(1);
  }
  function handleOrderStatus(e) {
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
    setOrder[1](`Ordenado ${e.target.value}`); // esto es solo para que se actualice el estado y se rerenderice la página. si no hay ningún estado que se actualice, aunque los juegos estén filtrados y ordenados, no se van a mostrar
  }

  function handleClick() {
    dispatch({
      type: "CLEAR_GAMES",
    });
  }

  function handleClickFilters() {
    dispatch(getGames());
  }

  return (
    <div>
      {currentGames.length > 0 ? (
        <div>
          <br />
          <Link to="/createGame">
            <button onClick={() => handleClick()}>Create a Videogame!</button>
          </Link>
          <h1>Available Videogames</h1>

          <button onClick={() => handleClickFilters()}>Clear filters</button>
          <div>
            <br />
            <div>
              <label>
                Origin
                <br />
              </label>
              <select onChange={(e) => handleFilterStatus(e)}>
                <option value="default">All</option>
                <option value="DB">Created</option>
                <option value="API">Available</option>
              </select>
            </div>
            <div>
              <label>
                Alphabetical order
                <br />
              </label>
              <select onChange={(e) => handleOrderStatus(e)}>
                <option value="default">Select</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
            </div>
            <div>
              <label>
                Order by Rating
                <br />
              </label>
              <select onChange={(e) => handleOrderStatus(e)}>
                <option value="default">Select</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div>
              <label>
                Search by Genre
                <br />
              </label>
              <select onChange={(e) => handleFilterStatus(e)}>
                <option key="default" value="default">
                  All
                </option>
                {genresDisplayed &&
                  genresDisplayed.map((genre, index) => (
                    <option key={index} value={genre}>
                      {genre}
                    </option>
                  ))}
              </select>
            </div>
            <br />
          </div>

          <Paginado
            gamesPerPage={gamesPerPage[0]}
            gamesFinded={gamesFinded.length}
            paginado={paginado}
          />

          <NavBar setCurrentPage={setCurrentPage} />

          {currentGames?.map((g) => {
            return (
              <div key={g.id}>
                <Link to={`/home/${g.id}`} onClick={() => handleClick()}>
                  <CardGame name={g.name} image={g.image} genres={g.genres} />
                </Link>
              </div>
            );
          })}

          <Paginado
            gamesPerPage={gamesPerPage[0]}
            gamesFinded={gamesFinded.length}
            paginado={paginado}
          />
        </div>
      ) : (
        <img src={Loading} alt='not found'/>
      )}
    </div>
  );
}
