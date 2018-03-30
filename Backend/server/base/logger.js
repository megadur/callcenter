
 var winston = require('winston');
 var logger = new (winston.Logger)({
    levels: {
     'info': 0,
     'ok': 1,
     'error': 2
    },
 colors: {
     'info': 'blue',
     'ok': 'green',
     'error': 'red'
    },
 transports: [
     new (winston.transports.Console)({level:'info',colorize: true})
 ]
});

module.exports = logger;
