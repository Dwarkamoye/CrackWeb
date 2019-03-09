var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');

var apiRouter = require('./routes/customer');

var app = express();

mongoose.connect('mongodb+srv://root:root@cluster-first-3mdlb.mongodb.net/firstdb', {promiseLibrary: require('bluebird')})
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

// mongodb://lesson7:lesson7@ds135540.mlab.com:35540/crud-mean-app
/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:root@cluster-first-3mdlb.mongodb.net/firstdb?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("firstdb").collection("firstcollection");
  // perform actions on the collection object
  console.log("Connected successfully to server");
  //console.log(collection);
  //client.close();
  return collection;

});*/


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist/crud-mean-app')));
app.use('/', express.static(path.join(__dirname, 'dist/crud-mean-app')));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
