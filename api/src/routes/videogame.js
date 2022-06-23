require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Videogame, Genre } = require("../db.js");

//---------

// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (id.includes("-")) {
    const game = await Videogame.findOne({
      where: { id },
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] }, // ver si esto se puede sacar
      },
    });
    const gameDBSent = {
      id: game.id,
      name: game.name,
      description: game.description,
      image: game.image,
      releaseDate: game.releaseDate,
      rating: game.rating,
      platforms: game.platforms &&
      game.platforms.map((p) => p.platform.name).join(", "), // esto fue cambiado, probar a ver si sigue andando bien
      genres: game.genres.map((p) => p.name).join(","),
    };
    return res.json(gameDBSent);
  } else {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      let {
        name,
        description_raw: description,
        background_image: image,
        released: releaseDate,
        rating,
        platforms,
        genres,
      } = response.data;

      const gameAPISent = {
        id,
        name,
        description,
        image,
        releaseDate,
        rating,
        platforms:
          platforms &&
          platforms
            .map((p) => p.platform.name)
            .filter(p => p != null)
            .join(", "),
        genres:
          genres &&
          genres
            .map((g) => g.name)
            .filter(g => g != null)
            .join(", "),
      };

      return res.send(gameAPISent);
    } catch (error) {
      console.log(error);
    }
  }
});

//---------

module.exports = router;
