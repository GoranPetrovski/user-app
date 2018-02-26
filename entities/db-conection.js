const Sequelize = require("sequelize");

//** create db connection with Sequelize that is promised based ORM for Node */
const connection = new Sequelize('null', 'null', 'null', {
    dialect: 'sqlite',
    storage: 'test.sqlite'
});

exports.connection = connection;
