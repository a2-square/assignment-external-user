(function() {
    "use strict";

    var mongoose = require('mongoose');
    var chalk = require('chalk');
    var config = require('./environment');
    /*==================================================================================================
     Connect to database
    ==================================================================================================*/
    mongoose.connect(config.mongo.WISSEN_DB, config.mongo.options);

    mongoose.connection.on('connected', function() {
        console.log(chalk.yellowBright('Database Connection Active'));
    });

    mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    });

    /*==================================================================================================
     Populate database with sample or system enums data
    ==================================================================================================*/
    if (config.mongo.seedDB == 'true') {
        require('./seed');
    }
}());