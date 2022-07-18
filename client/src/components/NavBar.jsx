import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesByName } from "../actions/index.js";
import styles from "./css/home.module.css";

export default function NavBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getGamesByName(name))
    setName('');
    setCurrentPage(1);
  }

  return (
    <div>
      <input id={styles.searchinput} type="text" placeholder="Search games" value={name} onChange={(e) => handleInputChange(e)}/>
      <button id={styles.createbutton} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  );
}
