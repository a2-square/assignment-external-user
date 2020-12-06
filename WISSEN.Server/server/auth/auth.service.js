'use strict';
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var ENUMS = require('../enums');
var validateJwt = expressJwt({ secret: config.secrets.session, algorithms: ['HS256'] });
var Service = require('../service');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
    return compose()
        // Validate jwt
        .use(function (req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function (req, res, next) {
            User.findById(req.user._id, function (err, user) {
                if (err) return next(err);
                if (!user) return Service._unAuthorised(req, res);
                req.user = user;
                next();
            });
        }).use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                var e = [];
                e.push(err);
                return Service._unAuthorised(req, res, e);
            } else {
                return Service.__handleError(req, res, err)
            }
        });
}

/**
 * Checks if the user role meets the requirements of the route
 */
function hasRole(roleRequired) {
    if (!roleRequired) throw new Error('Required role needs to be set');
    return compose()
        .use(isAuthenticated())
        .use((req, res, next) => {
            if (ENUMS.USER_ROLES.indexOf(req.user.role) == ENUMS.USER_ROLES.indexOf(roleRequired)) {
                next();
            } else {
                return Service._forbidden(req, res);
            }
        });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(_id, role) {
    return jwt.sign({ _id, role }, config.secrets.session, { expiresIn: config.secrets.expireIn });
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;