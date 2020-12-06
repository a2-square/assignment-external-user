'use strict';
/***************************************************************************************************************************

 * Shared Network services use by diffent controllers to handle API response
 
 **************************************************************************************************************************/
var response = {
    code: 200,
    error: "",
    message: "",
    data: {}
}

module.exports = {
    /*handle validation error */
    _validationError: function(req, res, err, msg) {
        response.code = 422;
        response.error = (req.headers.device) ? "" : (err) ? err : "";
        response.message = (msg) ? msg : "Something bad happened";
        response.data = {};
        return res.status(422).send(response);
    },

    /*handle error if content required in request but request is empty */
    _noContent: function(res, info) {
        response.code = 404;
        response.message = (info) ? info : "No content found";
        response.error = "";
        response.data = {};
        return res.status(404).send(response);
    },

    /*handle status 500*/
    _handleError: function(req, res, err, msg) {
        response.code = 500;
        response.error = (req.headers.device) ? "" : (err) ? err : "";
        response.message = (msg) ? msg : "Something bad happened";
        response.data = {};
        return res.status(500).send(response);
    },

    /*handle un-authorised user*/
    _unAuthorised: function(req, res, err) {
        response.code = 401;
        response.error = (req.headers.device) ? "" : (err) ? err : "";
        response.message = "Unauthorized";
        response.data = {};
        return res.status(401).send(response)
    },

    /* handle resource forbidden */
    _forbidden: function(req, res, err) {
        response.code = 403;
        response.error = (req.headers.device) ? "" : (err) ? err : "";
        response.message = "Access denied";
        response.data = {};
        return res.status(403).send(response)
    },

    /*handle response*/
    _response: function(res, data, msg) {
        response.code = 200;
        response.error = "";
        response.message = (msg) ? msg : "Success";
        response.data = (data) ? data : {};
        return res.status(200).send(response)
    }

};