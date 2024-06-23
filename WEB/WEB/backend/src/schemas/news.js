const sequelize = require("./postgres");
const { DataTypes, Model } = require('sequelize');

const News = sequelize.define( 'News',
    {
        // title: {
        // type: DataTypes.STRING,
        // allowNull: false,
        // // unique: true,
        // },
        news: {
        type: DataTypes.TEXT,
        allowNull: false,
        },
        image: {
        type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        modelName: 'News',
        tableName: 'News',
        timestamps: true,
    }
);

module.exports = News;
