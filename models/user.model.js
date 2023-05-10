const sequelize = require("../config/database")
const {DataTypes} = require('sequelize')

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },

    user_name: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    token: {type: DataTypes.STRING}
}, {freezeTableName: true})

module.exports = User