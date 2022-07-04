require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Op } = require("sequelize");
const { Genre, Videogame } = require("../db.js");

//---------

// GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal

// GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado

// poner un condicional de si hay un params name que traiga los que tengan ese nombre, y sino un listado de los videojuegos en general

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (name) {
    // caso en que esté declarada la variable busco sólo la info pedida, para no demorar tanto
    try {
      // ----------------------------------------------------------------------------
      // busco juegos alike {name} en la base de datos

      let gamesFindedDB = await Videogame.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] }, // ver si se puede sacar
        },
      });
      let gamesDB = gamesFindedDB.map((J) => J.toJSON()); // si no se hace el toJSON hay mucha información complementaria que envía la base de datos, esto solo deja la info del videojuego --> la DB manda la info asi: videogame { dataValues: { id:...}}
      gamesDB.forEach((g) => {
        (g.source = "DATABASE"),
          (g.genres = g.genres && g.genres.map((g) => g.name).join(" - "));
      });

      // -------------------------------------------------------------------------
      // busco juegos alike {name} en la API

      let gamesAPISearched = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
      );

      let gamesAPI = gamesAPISearched.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.background_image,
          releaseDate: game.releaseDate,
          rating: game.rating,
          source: "API",
          platforms:
            game.platforms &&
            game.platforms
              .map((p) => p.platform.name)
              .filter((p) => p != null)
              .join(" - "),
          genres:
            game.genres &&
            game.genres
              .map((g) => g.name)
              .filter((g) => g != null)
              .join(" - "),
        };
      });

      let returnedGames = gamesDB.concat(gamesAPI);

      returnedGames.length
        ? res.json(returnedGames)
        : res
            .status(404)
            .send(`No existe ningún juego que tenga la información "${name}"`);
    } catch (error) {
      console.log(error);
    }
  } else {
    // caso en que no se esté buscando nada en particular devuelvo toda la info

    // ----------------------------------------------------------------------------
    //traigo todos los juegos de la base de datos
    let gamesFindedDB = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    let gamesDB = gamesFindedDB.map((J) => J.toJSON());
    gamesDB.forEach((g) => {
      (g.source = "DATABASE"),
        (g.genres = g.genres && g.genres.map((g) => g.name).join(" - "));
    });

    // ----------------------------------------------------------------------------
    // traigo 100 juegos de la api
    try {
      let i = 0;
      let gamesAPI = [];
      let response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}`
      );
      while (i < 5) {
        const gamesCharged = response.data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            releaseDate: game.released,
            rating: game.rating,
            source: "API",
            platforms:
              game.platforms &&
              game.platforms
                .map((p) => p.platform.name)
                .filter((p) => p != null)
                .join(" - "),
            genres:
              game.genres &&
              game.genres
                .map((g) => g.name)
                .filter((g) => g != null)
                .join(" - "),
          };
        });
        gamesAPI = [...gamesAPI, ...gamesCharged];
        response = await axios.get(response.data.next);
        i++;
      }
      res.json(gamesDB.concat(gamesAPI)); // le doy prioridad a que aparezcan los creados primero
    } catch (error) {
      console.log(error);
    }
    // ----------------------------------------------------------------------------
  }
});

//---------

// POST /videogames:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos, relacionado a sus géneros.

router.post("/", async (req, res) => {
  let { name, description, image, releaseDate, rating, genres, platforms } =
    req.body;

  platforms = platforms.join(" - "); // las platforms vienen en un array, entonces los junto para mostrarlos en un string separados por ', '

  let gameFinded = await Videogame.findAll({
    where: { name: name },
  });

  if (!!gameFinded.length)
    return res.status(400).send("The game already exists");

  try {
    let gameCreated = await Videogame.create({
      name,
      description,
      image,
      releaseDate,
      rating,
      platforms,
    });

    image
      ? null
      : await gameCreated.update({
          image:
            "https://images.pexels.com/photos/8885140/pexels-photo-8885140.jpeg?auto=compress",
        });

    let generoDb = await Genre.findAll({
      where: { name: genres },
    });

    await gameCreated.addGenres(generoDb); //ojo que si en el front no se cargan los generos no se añaden, no se bien porque
  } catch (error) {
    console.log(error);
  }
  res.send("Game created succesfully");
});

//---------

module.exports = router;
