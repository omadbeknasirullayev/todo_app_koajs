const sequelize = require("../config/database")
const {DataTypes} = require('sequelize')

const Post = sequelize.define("post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },

    title: {type: DataTypes.STRING, allowNull: false},
    user_id: {type: DataTypes.INTEGER},
    status: {type: DataTypes.BOOLEAN, defaultValue: false},
    expiring_date: {type: DataTypes.DATE},
}, {freezeTableName: true})

module.exports = Post