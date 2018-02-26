const Sequelize = require("sequelize");

const connection = new Sequelize('null', 'null', 'null', {
    dialect: 'sqlite',
    storage: 'test.sqlite'
});

exports.connection = connection;
