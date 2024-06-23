const sequelize = require("./postgres");
const { DataTypes, Model } = require('sequelize');

const LiveDiagnostics = sequelize.define( 'LiveDiagnostics',
    {
        description: {
        type: DataTypes.TEXT,
        allowNull: false,
        },  

        // carId: {
        // type: DataTypes.INTEGER,
        // allowNull: false,
        // unique: true,
        // },
        // engineTemp: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
        // fuelLevel: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
        // oilPressure: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
        // batteryVoltage: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
        // engineRPM: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
        // vehicleSpeed: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
        // coolantTemp: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
        // throttlePosition: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
        // fuelPressure: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
        // intakeAirTemp: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
        // engineLoad: {
        // type: DataTypes.FLOAT,
        // allowNull: false,
        // },
    },
    {
        sequelize,
        modelName: 'LiveDiagnostics',
        tableName: 'LiveDiagnostics',
        timestamps: true,
    }
);

module.exports = LiveDiagnostics;