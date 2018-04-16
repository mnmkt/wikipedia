//subrouter
const express =require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
module.exports = router;

//GET /wiki
router.get('/', function(req, res, next){

  Page.findAll({})
  .then(function (thePages){
    res.render('index', {
      pages: thePages
    })
  })
  .catch(next);
});

//POST /wiki
router.post('/', function(req, res, next){

  User.findOrCreate({
    where: {
      email: req.body.authorEmail,
      name: req.body.authorName
    }
  })
    .spread(function (user, wasCreatedBool){

      return Page.create({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
      }).then(function (createdPage){
          return createdPage.setAuthor(user);
      });
    })
    .then(function (createdPage){
      res.redirect(createdPage.route)
    })
    .catch(next);

  // const newPage = Page.build(req.body);

  // newPage.save()
  // .then(function (){
  //   res.redirect('/wiki');
  // })
  // .catch(next);
});

//GET /wiki/add
router.get('/add', function(req, res){
  res.render('addpage');
});

// ex) /wiki/Javascript
router.get('/:urlTitle', function(req, res, next){

  const urlTitleOfAPage = req.params.urlTitle;

  Page.findOne({
    where: {
      urlTitle: urlTitleOfAPage
    }
  })
    .then(function (page){
      if (page === null) {
        return next(new Error('That page was not found!'));
      }

      return page.getAuthor()
        .then(function (author){
          page.author = author;


          res.render('wikipage', {
            page: page
          })
         })

    })
    .catch(next)
});
