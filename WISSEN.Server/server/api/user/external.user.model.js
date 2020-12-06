(function () {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        crypto = require('crypto'),
        ENUMS = require('../../enums'),
        Services = require('../../service'),

        ExternalUserSchema = new Schema({
            firstName: { type: String },
            lastName: { type: String },
            email: { type: String, lowercase: true, unique: true },
            hashedSSN: { type: String, unique: true },
            salt: { type: String },
            PhoneNumber: { type: String },
            fullAddress: { type: String }
        }, { timestamps: true });

    /**
     * Virtuals
     */
    ExternalUserSchema
        .virtual('ssn')
        .set(function (ssn) {
            this._ssn = ssn;
            this.salt = this.makeSalt();
            this.hashedSSN = this.encryptSSN(ssn);
        })
        .get(function () {
            return this._ssn;
        });

    /**
     * Validations
     */

    // Validate empty email
    ExternalUserSchema
        .path('email')
        .validate(function (email) {
            return email.length;
        }, 'Email cannot be blank');

    // Validate empty SSN
    ExternalUserSchema
        .path('hashedSSN')
        .validate(function (hashedSSN) {
            return hashedSSN.length;
        }, 'SSN cannot be blank');

    /**
     * Methods
     */
    ExternalUserSchema.methods = {
        /**
         * Make salt
         *
         * @return {String}
         * @api public
         */
        makeSalt: function () {
            return crypto.randomBytes(16).toString('base64');
        },
        /**
         * Encrypt ssn
         *
         * @param {String} ssn
         * @return {String}
         * @api public
         */
        encryptSSN: function (ssn) {
            if (!ssn || !this.salt)
                return '';
            var salt = new Buffer(this.salt, 'base64');
            return crypto.pbkdf2Sync(ssn, salt, 10000, 64, 'sha1').toString('base64');
        }
    };

    module.exports = mongoose.connections[Services.getObjectIndex(mongoose.connections, "name", process.env.WISSEN_DB_NAME)]
        .model(ENUMS.WISSEN_DB_COLLECTIONS.EXTERNAL_USERS.name, ExternalUserSchema, ENUMS.WISSEN_DB_COLLECTIONS.EXTERNAL_USERS.name);
}());