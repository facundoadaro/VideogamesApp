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
    image: {
      type: DataTypes.TEXT,
    },
    releaseDate: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.DECIMAL(4,2), // el numero decimal puede tener 4 dígitos como máximo y de esos 4 digitos 2 se encuentran después de la coma
      defaultValue: 3.5
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  });
};
