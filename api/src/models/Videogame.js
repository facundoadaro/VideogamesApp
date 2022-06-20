const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // ver si hay que añadir alguna imagen
    releaseDate: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1), // el numero decimal puede tener 3 dígitos como máximo y de esos 3 digitos uno se encuentra después de la coma
    },
    platform: {
      type: DataTypes.STRING, // ver si puede servir también DataTypes.ARRAY(DataTypes.STRING) --> ej: ['ps1','Xbox']
      allowNull: false,
    },
  });
};
