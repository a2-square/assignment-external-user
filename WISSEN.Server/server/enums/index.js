'use strict';

var _ = require('lodash');
var collections_enums = require('./collections.js');
var user_enum = require('./user.js');
/***************************************************************************************************************************
 Export all enums
 **************************************************************************************************************************/
var all = {};

module.exports = _.merge(
    all,
    collections_enums,
    user_enum,
);;