const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allownull: false
    },
    idUser: {
      type: DataTypes.STRING,
      allownull: false
    }
  })
}