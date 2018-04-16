//subrouter
const express =require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const Promise = require('bluebird');
module.exports = router;

//GET /users
router.get('/', function(req, res, next){

  User.findAll()
    .then(function (users){
      res.render('users', {
        users: users
      });
    })
    .catch(next);
});

//GET /users/id
router.get('/:userId', function(req, res, next){

  const findingUserPages = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  const findingUser = User.findById(req.params.userId)

  Promise.all([
    findingUserPages, findingUser
  ])
    .then(function(values){
      const pages = values[0];
      const user = values[1];

      user.pages = pages;

      res.render('userpage', {
        user: user
      })
    })
    .catch(next);
});

