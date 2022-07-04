import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesByName } from "../actions/index.js";

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
      <input type="text" placeholder="Search games" value={name} onChange={(e) => handleInputChange(e)}/>
      <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  );
}
