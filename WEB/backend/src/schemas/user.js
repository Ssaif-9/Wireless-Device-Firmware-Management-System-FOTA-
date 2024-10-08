// user.js
const sequelize = require("./postgres");
const { DataTypes, Model } = require("sequelize");
const validator = require("validator");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      defaultValue: "user",
      validate: {
        isIn: [["user", "admin", "member"]],
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
      validate: {
        len: [11, 11],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid E-mail!");
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: [7, 100],
        notContains: "password",
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    tokens: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    avatar: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "User",
    timestamps: true,
  }
);

module.exports = User;
