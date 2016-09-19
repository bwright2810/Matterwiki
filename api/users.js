/*
This file contains all the endpoints related to topics.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/


// Importing the topics model
var Users = require('../models/user.js');

var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports = function(app) {


  app.post('/api/users',function(req,res){
    /*
    This is a POST endpoint which takes the user name, email, password, and about to create
    a new user profile.
    It responds with the created user object in the data key.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Users.forge()
      .save({name: req.body.name, email: req.body.email, password: req.body.password, about: req.body.about})
      .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  });


  app.get('/api/users',function(req,res){
    /*
    This is a GET endpoint that responds with the list of all the topics in the topics table
    the topics are present in the data object in the returning object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Users.forge()
    .fetchAll()
      .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  });

}
