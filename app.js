//require express module, data.json and path module
var express = require('express');
var data = require('./data.json');
var path = require('path');

//create app object by calling the express() function
var app = express();

//use a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static(path.join(__dirname, 'public')));

//set “view engine” to “pug”
app.set('view engine', 'pug');

//set home route
app.get('/', function(req, res){
  res.render('index', {data: data.projects})
});

//set about route
app.get('/about', function(req, res){
  res.render('about')
});

//set project route
data.projects.forEach(function(project){
  app.get(`/project/${project.id}`, function(req, res){
    res.render('project', {project: project})
  })
});

//using new error constructor to create an 404 err object and pass in a error message/code
app.use(function(req, res, next){
  const err = new Error('Oops! Page does not exist.');
  err.status = 404;
  next(err);
});

//error handler renders an error template with the err object passed in and logs out the error message to console
app.use(function(err, req, res, next){
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
  console.log('Oops! Page does not exist.');
});

//app is listening on port 3000
app.listen(3000, () => console.log('This app is listening to port 3000'));
