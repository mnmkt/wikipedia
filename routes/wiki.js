//subrouter
const express =require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
module.exports = router;

//GET /wiki
router.get('/', function(){

});

//POST /wiki
router.post('/', function(req, res, next){
  const newPage = Page.build(req.body);

  newPage.save()
  .then(function (){
    res.redirect('/wiki');
  })
  .catch(function (err){
    next(err);
  });
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
      console.log(page);
    })
    .catch(next)
});
