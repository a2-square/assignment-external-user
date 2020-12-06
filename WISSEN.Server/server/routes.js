/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/users', require('./api/user'));
    app.use('/api/auth', require('./auth'));
    // All undefined api routes should return a 404
    app.route('/:url(api|)/*')
        .get(errors[404]);
};