const Promise = require('bluebird');
const router = require('simple-router');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const UserManager = require('../services/user-manager').UserManager;

const app = router();

//**Endpoint for get all users from sqlite */
app.get(
    '/',
    (req, res) => {
        const userMng = new UserManager();
        return userMng.getAllUsers().then(users => {
            res.render('index', {
                users
            });
        });
    }
)

/**Endpoint for create new user to sqlite 
I must set urlencodedParser how to work with ejs teplate
because when client input firstName and lastName and click on save btn
the post request to server is invoked.
When I am try in postman this code I must set bodyparser as middleware.
My idea is when user create new user to get all users that are in sqlite db
*/
app.post(
    '/',
    urlencodedParser,
    (req, res) => {
        const userMng = new UserManager();
        return userMng.createUser(req.body).then(user => {
            return userMng.getAllUsers().then(users => {
                res.render('index', {
                    users
                });
            });
        });
    }
)

exports.route = app.route;
