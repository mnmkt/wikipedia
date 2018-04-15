const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const models = require('./models');
const Page = models.Page;
const User = models.User;

const app = express();
const wikiRouter = require('./routes/wiki'); //setting up subrouter

app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache:true});
app.set('view engine', 'html');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
})

//error Middleware
app.use(function (err, req, res, next){
  console.error(err);
  res.status(500).send(err.message);
});

 //setting up subrouter
app.use('/wiki', wikiRouter);

User.sync()
  .then(function(){
    return Page.sync();
  })
  .then(function(){
    app.listen(3001, function(){
      console.log('Server is listening on port 3001!');
    });
  });


