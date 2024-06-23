const sequelize = require("./postgres");
// const { DataTypes, Model } = require('sequelize');
const User = require('./user');
const Car = require('./car');

const UserCar = sequelize.define( 'UserCar', {},
  {
    sequelize,
    modelName: 'UserCar',
    tableName: 'UserCar',
    timestamps: false,
  }
);

User.belongsToMany( Car, { through: UserCar } );
Car.belongsToMany(User, { through: UserCar });

module.exports = UserCar;