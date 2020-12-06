'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var Service = require('../../service');

var router = express.Router();

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error)
            return Service._handleError(req, res, "", error.message);
        if (!user)
            return Service._noContent(res);

        var data = { token: auth.signToken(user._id, user.role) }
        Service._response(res, data);
    })(req, res, next)
});

module.exports = router;