//subrouter
const express =require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
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
  const newPage = Page.build(req.body);

  newPage.save()
  .then(function (){
    res.redirect('/wiki');
  })
  .catch(next);
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
      res.render('wikipage', {
        page: page
      })
    })
    .catch(next)
});
