import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBy, orderBy, getGames, getGenres } from "../actions/index.js";
import { Link } from "react-router-dom";
import CardGame from "./CardGame";
import Paginado from "./Paginado";
import NavBar from "./NavBar";

export default function Home() {
  const dispatch = useDispatch(); // useDispatch manda la info necesaria a la constante dispatch para poder despachar las acciones

  const allGames = useSelector((state) => state.games); // useSelector es un Hook que nos permite extraer datos del store de redux utilizando una función selectora (es análogo al mapStateToProps) -- en la constante guardo todo lo que tenga el state.games del

  const allGenres = useSelector((state) => state.genres);

  // ------------------------------------------------
  //                PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);

  const lastGame = currentPage * gamesPerPage;
  const firstGame = lastGame - gamesPerPage;

  const currentGames = allGames.slice(firstGame, lastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ------------------------------------------------

  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
  }, [dispatch]);

  function handleFilterStatus(e) {
    dispatch(filterBy(e.target.value));
    setCurrentPage(1);
  }
  function handleOrderStatus(e) {
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`); // esto es solo para que se actualice el estado y se rerenderice la página. si no hay ningún estado que se actualice, aunque los juegos estén filtrados y ordenados, no se van a mostrar
  }

  return (
    <div>
      <Link to="/createGame">Create a Videogame!</Link>
      <h1>Available Videogames</h1>

      <div>
        <div>
          <label>Origin </label>
          <select onChange={(e) => handleFilterStatus(e)}>
            <option value="default">All</option>
            <option value="DB">Created</option>
            <option value="API">Available</option>
          </select>
        </div>
        <div>
          <label>Alphabetical order </label>
          <select onChange={(e) => handleOrderStatus(e)}>
            <option value="default">Select</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div>
          <label>Order by Rating </label>
          <select onChange={(e) => handleOrderStatus(e)}>
            <option value="default">Select</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <label>Search by Genre </label>
          <select onChange={(e) => handleFilterStatus(e)}>
          <option key="default" value="default">All</option>
            {allGenres &&
              allGenres.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <Paginado
        gamesPerPage={gamesPerPage}
        allGames={allGames.length}
        paginado={paginado}
      />

      <NavBar
      setCurrentPage= {setCurrentPage}
      />

      {currentGames?.map((g) => {
        return (
          <div key={g.id}>
            <Link to={`/home/${g.id}`}>
              <CardGame name={g.name} image={g.image} genres={g.genres} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
