import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postGame } from "../actions/index.js";

export default function CreateGame() {
  //--------- TRAE INFO DEL ESTADO DE REDUX Y CREA ESTADOS LOCALES ----------
  const dispatch = useDispatch();
  const history = useHistory();
  const allPlatforms = useSelector((state) => state.platforms);
  const allGenres = useSelector((state) => state.genres);

  const [errors, setErrors] = useState({
    name: "", // pongo un string vacío para que no se me habilite el botón de submit apenas entro a la pagina
  });

  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    releaseDate: "",
    rating: 0,
    genres: [],
    platforms: [],
  });

  //------------------- FUNCION VALIDADORA DE INPUTS -------------------

  function validate(input) {
    //------------------- VALIDACIONES GENERALES -------------------
    let errors = {};
    let urlValidation =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    if (!input.name) {
      errors.name = "The name of the game is required";
    }
    if (!input.description) {
      errors.description = "The description of the game is required";
    }
    if (!input.image.match(urlValidation) && input.image.length >= 1) {
      errors.image = "Insert a valid URL";
    }
    if (input.genres.length === 0) {
      errors.genres = "At least one genre must be chosen";
    }
    if (input.platforms.length === 0) {
      errors.platforms = "At least one platform must be chosen";
    }

    return errors;
  }

  //------------------- FUNCIONES HANDLERS DE INPUTS -------------------

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheckGenres(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
    if (!e.target.checked) {
      setInput({
        ...input,
        genres:
          input.genres && input.genres.filter((g) => g !== e.target.value),
      });
    }
    setErrors(
      validate({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    );
  }

  function handleCheckPlatforms(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
    if (!e.target.checked) {
      setInput({
        ...input,
        platforms:
          input.platforms &&
          input.platforms.filter((p) => p !== e.target.value),
      });
    }
    setErrors(
      validate({
        ...input,
        platforms: [...input.platforms, e.target.value],
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postGame(input));
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

  // useEffect(() => {
  //   console.log(errors)
  // },[errors])

  return (
    <div>
      <br />
      <Link to="/home">
        <button>Home</button>
      </Link>

      <h1>Create a new Videogame!</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            Name<strong>*</strong>
          </label>
          <br />
          <input
            required
            type="text"
            value={input.name}
            name="name"
            placeholder="Ex: Grand Theft Auto V "
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <br />
        <div>
          <label>
            Description<strong>*</strong>
          </label>
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
          {errors.description && <p>{errors.description}</p>}
        </div>
        <br />
        <div>
          <label>Image</label>
          <br />
          <input
            type="text"
            value={input.image}
            name="image"
            placeholder="Ex: https://www.yourhostimage.com/image.jpg "
            onChange={(e) => handleChange(e)}
          />
          {errors.image && <p>{errors.image}</p>}
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
          <label>
            Genres<strong>*</strong>
          </label>
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
          {errors.genres && <p>{errors.genres}</p>}
        </div>
        <br />
        <div>
          <label>
            Platforms<strong>*</strong>
          </label>
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
          {errors.platforms && <p>{errors.platforms}</p>}
        </div>
        <br />
        {Object.keys(errors).length ? (
          <button disabled type="submit">
            Crear personaje
          </button>
        ) : (
          <button type="submit">Crear personaje</button>
        )}
      </form>
      <br />
    </div>
  );
}
