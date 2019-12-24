var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// var walk = require('walkdir');

// //async with path callback 
// var startingPath = './pdf';

// walk(startingPath, function(path, stat) {
//   console.log('found: ', path);
// });

// //use async emitter to capture more events
// var emitter = walk(startingPath);

// emitter.on('file', function(filename, stat) {
//   console.log('file from emitter: ', filename);
// });


// //sync with callback
// walk.sync(startingPath, function(path, stat) {
//   console.log('found sync:', path);
// });

// //sync just need paths
// var paths = walk.sync(startingPath);
// console.log('found paths sync: ', paths);

// //async await/promise!
// let result = await walk.async(startingPath,{return_object:true})
// result['path'] = {statObject}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;