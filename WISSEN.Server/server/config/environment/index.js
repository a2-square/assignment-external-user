'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// console.log("ENV : ", process.env);

// All configurations will extend these options
// ============================================
var all = {
    env: (process.env.NODE_ENV) ? process.env.NODE_ENV : requiredProcessEnv('NODE_ENV'),

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: process.env.JWT_SECRET_SESSION,
        expireIn: process.env.JWT_TOKEN_EXPIRE
    },

    swaggerHost: process.env.SWAGGER_HOST
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});