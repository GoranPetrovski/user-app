const Promise = require('bluebird');
const router = require('simple-router');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const UserManager = require('../services/user-manager').UserManager;

const app = router();

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
