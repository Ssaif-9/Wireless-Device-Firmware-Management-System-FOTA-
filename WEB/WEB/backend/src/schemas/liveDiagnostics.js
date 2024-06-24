const sequelize = require("./postgres");
const { DataTypes, Model } = require('sequelize');

const LiveDiagnostics = sequelize.define( 'LiveDiagnostics',
    {
        diagnostics: {
        type: DataTypes.TEXT,
        allowNull: false,
        },  
    },
    {
        sequelize,
        modelName: 'LiveDiagnostics',
        tableName: 'LiveDiagnostics',
        timestamps: true,
    }
);

module.exports = LiveDiagnostics;