const Sequelize = require("sequelize");
const dbConnection = require('./db-conection');

//** create user entity with firstName and lastName */
const user = dbConnection.connection.define('User', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
});

exports.user = user;