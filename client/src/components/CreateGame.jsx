import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postGame } from "../actions/index.js";

export default function CreateGame() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allPlatforms = useSelector((state) => state.platforms);
  const allGenres = useSelector((state) => state.genres);

  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    releaseDate: "",
    rating: 0,
    genres: [], // ver la condición/restricción de que al menos haya uno seleccionado
    platforms: [], // ver la condición/restricción de que al menos haya uno seleccionado
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheckGenres(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }

  function handleCheckPlatforms(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postGame(input));
    alert("Game successfully created");
    setInput({
      name: "",
      description: "",
      image: "",
      releaseDate: "",
      rating: 0,
      genres: [],
      platforms: [],
    });
    history.push("/home");
  }

  // el componente Home trae los generos cuando es cargado, sin embargo, si nos encontramos en el componente createGame y refrescamos la página esa información se pierde y el estado de generos está vacío, por lo que no se renderizan los apartados del checkbox
  // se podría usar un useffect acá también para esos casos. Si se realiza el flujo normal de la página va a funcionar se haga esto o no se haga
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div>
      <br />
      <Link to="/home">
        <button>Home</button>
      </Link>

      <h1>Create a new Videogame!</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name</label>
          <br />
          <input
            required
            type="text"
            value={input.name}
            name="name"
            placeholder="Ex: Grand Theft Auto V "
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />
        <div>
          <label>Description</label>
          <br />
          <textarea
            required
            type="text"
            value={input.description}
            name="description"
            placeholder="Ex: The story of three uniquely-different criminals as they commit daring and profitable heists across the sprawling city of Los Santos"
            cols="40"
            rows="6"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />
        <div>
          <label>Image</label>
          <br />
          <input
            type="url"
            value={input.image}
            name="image"
            placeholder="Ex: https://www.yourhostimage.com/image.jpg "
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />
        <div>
          <label>Rating</label>
          <br />
          <input
            type="range"
            value={input.rating}
            name="rating"
            placeholder="Rate from 1 to 5 (Ex: 3.84 )"
            min="1"
            max="5"
            step=".01"
            onChange={(e) => handleChange(e)}
          />
          {/* <input type="number" value={input.rating} name="rating" placeholder='Rate from 1 to 5 (Ex: 3.84 )' min="1" max="5"/>
          <input type="text" value={input.rating} name="rating" placeholder='Rate from 1 to 5 (Ex: 3.84 )' /> */}
        </div>
        <br />
        <div>
          <label>Release Date</label>
          <br />
          <input
            type="date"
            value={input.releaseDate}
            name="releaseDate"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />
        <div>
          <label>Genres</label>
          <br />
          {allGenres &&
            allGenres.map((g) => (
              <div key={g.id}>
                <label>
                  <input
                    type="checkbox"
                    value={g.name}
                    name={g.name}
                    onChange={(e) => handleCheckGenres(e)}
                  />
                  {g.name}
                </label>
              </div>
            ))}
        </div>
        <br />
        <div>
          <label>Platforms</label>
          <br />
          {allPlatforms &&
            allPlatforms.map((platform, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={platform}
                    name={platform}
                    onChange={(e) => handleCheckPlatforms(e)}
                  />
                  {platform}
                </label>
              </div>
            ))}
        </div>
        <br />
        <button type="submit">Crear personaje</button>
      </form>
      <br />
    </div>
  );
}
