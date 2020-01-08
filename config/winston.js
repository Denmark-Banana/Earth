const winston = require('winston');
const appRoot = require('app-root-path');
require('winston-daily-rotate-file');
require('date-utils');

const myformat = winston.format.printf(
    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`
)

const logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.DailyRotateFile({
            filename: `${appRoot}/logs/test.log`,
            zippedArchive: false,
            format: myformat,
            handleExceptions: true
        }),
        new winston.transports.Console({
            format: myformat,
            handleExceptions: true,
            colorize: true,
        })
    ]
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;