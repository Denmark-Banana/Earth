const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const apiRouter = require('./api/index');


const app = express();
require('./passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//db Configuration
mongoose.connect('mongodb://localhost:27017/sample', {
    useNewUrlParser: true
});
const db = mongoose.connection;

const handleOpen = () => console.log('-> connected to DB');
const handleError = (err) => console.log(' Error on DB Connection : ${err}')

db.once('open', handleOpen);
db.on('error', handleError);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    secret: '@#@$MYSIGN#@$#$',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/api', apiRouter);

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