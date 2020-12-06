'use strict';

var User = require('./user.model');
var ExternalUser = require('./external.user.model');
var _ = require('lodash');
var Service = require('../../service');
var ENUMS = require('../../enums');

/***************************************************************************************************************************
 * list/search external users details with pagination
 * API : /api/user/
 * METHOD : Post 
 * Minimum Role Required : admin
 * Secuirty : Authentication Required 
 **************************************************************************************************************************/
exports.all = async function (req, res) {
    // console.log("Request where in user moduel : ", req.body.where);
    var requested_where = req.body.where || {};
    try {
        requested_where = Service._removeBlankKey(requested_where);
        var orQueryFields = ["firstName", "lastName", "email", "PhoneNumber", "fullAddress"]; //Array of field on which admin can search user
        var where;

        where = Service._buildFindQuery(requested_where, orQueryFields);
        console.log("Query To be perform on user collection : ", where);
        if (req.body.getType && req.body.getType == "all") {
            ExternalUser.find(where, '_id firstName lastName email PhoneNumber fullAddress hashedSSN', function (err, users) {
                return Service._response(res, users);
            });
        } else {
            if (!req.body.page) return Service._noContent(res, "Please provide page number");
            const sort = (req.body.sort) ? "-" + req.body.sort : '-updatedAt';
            const limit = (req.body.limit) ? parseInt(req.body.limit) : 30;
            const skip = (req.body.page == 1) ? 0 : req.body.page * limit - limit;
            const total = await ExternalUser.countDocuments(where)
            const data = await ExternalUser.find(where)
                .select({ _id: 1, firstName: 1, lastName: 1, email: 1, fullAddress: 1, createdAt: 1 })
                .skip(skip)
                .limit(limit)
                .sort(sort)
                .lean()
                .exec();
            let results = {
                data,
                total,
                limit
            }

            return Service._response(res, results);
        }
    } catch (err) {
        return Service._handleError(req, res, err);
    }
};

/***************************************************************************************************************************
 * Get loggedIn User profile
 * API /api/users/me
 * METHOD GET 
 * Secuirty -> Authentication Required 
 **************************************************************************************************************************/

exports.me = async function (req, res) {
    var userId = req.user._id;
    try {
        const userDetails = await User.findById(userId)
            .select({ _id: 1, firstName: 1, lastName: 1, email: 1 })
            .lean()
            .exec();
        if (!userDetails)
            return Service._noContent(res);
        return Service._response(res, userDetails);
    } catch (e) {
        return Service._handleError(req, res, err);
    }
}

/***************************************************************************************************************************
 * submit External user details in wissen system
 * API /api/users/
 * METHOD POST 
 * Secuirty -> Open 
 **************************************************************************************************************************/

exports.submitUserDetails = async function (req, res, next) {
    var request_body = {};
    try {
        request_body = _.merge(request_body, req.body);
        if (!req.body.email || !req.body.ssn)
            return Service._validationError(req, res, 'Some required field is missing');

        request_body = Service._acceptedExternalUserFields(request_body, ENUMS.ACCEPT_USER_FIELDS);

        var newUser = new ExternalUser(request_body);
        await newUser.save();
        let msg = 'We have recived you information!';
        return Service._response(res, null, msg);

    } catch (e) {
        return Service._validationError(req, res, e);
    }
};