const { DataTypes } = require("sequelize");

const sequelize = require("../../utilities/db-config");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  account_valid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  extraSkills: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  areaOfOperation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dpImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idFront: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idBack: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  client: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  workman: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  starting_fee: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
