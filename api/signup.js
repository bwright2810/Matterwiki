var Users = require('../models/user.js');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
var auth = require('../shippingauth.js')

module.exports = function (app) {

    app.post('/signup', function (req, res) {
        /*
        This is a POST endpoint which takes the user name, email, password, and about to create
        a new user profile.
        It responds with the created user object in the data key.
        the error key in the returning object is a boolen which is false if there is no error and true otherwise
        */
        console.log("In sign up");
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            console.log("hashed password");
            Users.forge()
                .save({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    about: req.body.about,
                    admin: auth.admin_auth === req.body.adminAuth ? "Y" : null
                })
                .then(function(user){
                    console.log("here. user: ");
                    console.log(user);
                    res.json({
                        error: {
                            error: false,
                            message: ''
                        },
                        code: 'B131',
                        data: user.toJSON()
                    });
                    console.log('set the response');
                })
                .catch(function (error) {
                    console.log('in error');
                    console.log(error);
                    res.status(500).json({
                        error: {
                            error: true,
                            message: "There was an error creating the user."
                        },
                        code: 'B132',
                        data: {

                        }
                    })
                });
        });
    });
}
