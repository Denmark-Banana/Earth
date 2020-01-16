const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const winston = require('./config/winston')

const globalRouter = require('./routes/globalRoutes');
const manualRouter = require('./routes/manualRoutes');

const yamlLoader = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = yamlLoader.load('./swagger.yaml');

const app = express();
const requestTest = require('./test/requestTest');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev', { stream: winston.stream }));
winston.info('starting server');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', globalRouter);
app.use('/api', manualRouter);

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