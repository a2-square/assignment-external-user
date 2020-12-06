'use strict';
/***************************************************************************************************************************

 * Shared Service use by diffent controllers 
 
 **************************************************************************************************************************/
var _ = require('lodash');
var NETWORK_SERVICE = require('./network');
// All Service will extend these Service
// ============================================
var COMMON_SERVICES = {

    //get index of object in array (ES6)
    getObjectIndex: function (array, key, value) {
        return array.findIndex(ind => ind[key] == value);
    },
    _buildFindQuery: function (where, options) {
        if (!where && typeof where != 'object') return cb("Invaild query", null);

        var query = {}
        _.forEach(where, (value, key, obj) => {
            if (key == "q") {
                console.log("q  running....");
                query['$or'] = this._buildOrQuery(options, value);
            } else if (value instanceof Array) {
                query[key] = { "$in": value }
            } else {
                query[key] = value;
            }
        });
        return query;
    },

    _buildOrQuery: function (options, value) {
        var OrQuery = [];
        var Regxexpression = new RegExp(value, "i");
        _.forEach(options, function (field) {
            var orField = {};
            orField[field] = Regxexpression;
            OrQuery.push(orField);
        });
        return OrQuery;
    },

    _removeBlankKey: function (where) {
        var filters = JSON.parse(JSON.stringify(where));
        _.forEach(filters, function (value, key, obj) {
            // if (!filters[key] || filters[key].length == 0 || filters[key] == null || filters[key] == undefined)
            if (filters[key] == null || filters[key] == undefined || filters[key].length == 0)
                delete filters[key];
        });
        return filters;
    },

    _acceptedExternalUserFields: function (object, fieldsArray) {
        var acceptFields = {};
        for (let i = 0; i < fieldsArray.length; i++) {
            acceptFields[fieldsArray[i]] = object[fieldsArray[i]];
        }
        return acceptFields;
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    COMMON_SERVICES,
    NETWORK_SERVICE
);