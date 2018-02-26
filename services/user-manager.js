const User = require('../entities/user').user;
const dbConnection = require('../entities/db-conection').connection;

class UserManager {
    /** create user with 
    * @param obj that contains user firstName and lastName
    */
    createUser(obj) {
        console.log("create user:", obj.firstName);
        if (obj && (!obj.firstName || !obj.firstName)) {
            return Promise.reject("You must set your firstName and lastName");
        }
        return dbConnection.sync().then(() => {
            return User.create({
                firstName: obj.firstName,
                lastName: obj.lastName
            }).then(user => ({ user }));
        });
    }

    /** get all users from sqlite */
    getAllUsers() {
        return dbConnection.sync().then(() => {
            return User.findAll().then((users) => {
                //** Check for users records in db, if no usres recored return err message */
                if (users.length == 0) {
                    return Promise.reject("No users in db yet!")
                }
                console.log(`All users, num of users: ${users.length} => ${users}`);
                return Promise.resolve(users);
            });
        });
    }
}

exports.UserManager = UserManager;