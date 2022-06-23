const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const genre = require("./genre");
const videogame = require("./videogame");
const videogames = require("./videogames");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogames);

router.use("/videogame", videogame);

router.use("/genres", genre);



module.exports = router;
