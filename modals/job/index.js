const { DataTypes } = require("sequelize");

const sequelize = require("../../utilities/db-config");

const Job = sequelize.define("job", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  review: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  workmanID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Job;
