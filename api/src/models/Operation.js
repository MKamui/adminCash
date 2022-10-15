const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('operation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allownull: false,
    },
    concept: {
      type: DataTypes.STRING,
      allownull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allownull: false
    },
    date: {
      type: DataTypes.STRING,
      allownull: false
    },
    type: {
      type: DataTypes.ENUM('Income', 'Expense'),
      allownull: false
    },
    category: {
      type: DataTypes.ENUM('Documentation', 'Food', 'Job', 'Maintenance', 'Transportation', 'Other'),
      allownull: false
    },
    idUser: {
      type: DataTypes.STRING,
      allownull: false
    }
  })
}