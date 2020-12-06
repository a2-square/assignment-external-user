/**
 * Express configuration
 */

'use strict';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require(config.root + '/swagger.json');
var rfs = require('rotating-file-stream');
var fs = require('fs');
var chalk = require('chalk');
const rateLimit = require("express-rate-limit");

module.exports = function (app) {
    var env = app.get('env');
    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());

    // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // see https://expressjs.com/en/guide/behind-proxies.html
    app.set('trust proxy', 1);
    const limiter = rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: 150 // limit each IP to 150 requests per windowMs
    });
    //  apply to all requests
    app.use(limiter);



    // ensure log directory exists 
    var logDirectory = config.root + '/server/log';
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

    console.log(chalk.blueBright("Application logged at path : ", logDirectory));


    // create a rotating write stream for log files
    var accessLogStream = rfs.createStream('access.log', {
        interval: '7d', // rotate daily 
        path: logDirectory
    })

    //swagger settings
    var customCssHideSwggerHeade = '.swagger-ui .topbar { display: none !important }';
    var customfavIconSwagger = config.root + "/favicon.ico";
    swaggerDocument.host = config.swaggerHost + ":" + config.port;
    console.log("swaggerDocument.host", swaggerDocument.host);
    swaggerDocument.info.license.url = "http://" + config.swaggerHost + ":" + config.port;

    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
    app.use(morgan('combined', { stream: accessLogStream }));

    if ('development' === env) {
        //mount swagger ui at /api-docs
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, null, null, customCssHideSwggerHeade, customfavIconSwagger, null, "API's Documentation - Wissen Assignment"));
        app.use(errorHandler()); // Error handler - has to be last
    }
};