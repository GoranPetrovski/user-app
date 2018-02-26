const User = require('../entities/user').user;
const dbConnection = require('../entities/db-conection').connection;

class UserManager {

    createUser(obj) {
        console.log("create user:", obj);
        return dbConnection.sync().then(function () {
            return User.create({
                firstName: obj.firstName,
                lastName: obj.lastName
            }).then(user => ({ user }));
        });
    }

    getAllUsers() {
        return dbConnection.sync().then(function () {
            return User.findAll().then(function (users) {
                console.log(`All users, num of users: ${users.length} => ${users}`);
                return Promise.resolve(users);
            });
        });
    }
}

exports.UserManager = UserManager;