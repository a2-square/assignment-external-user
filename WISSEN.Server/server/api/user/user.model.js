(function () {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        crypto = require('crypto'),
        ENUMS = require('../../enums'),
        Services = require('../../service'),

        UserSchema = new Schema({
            firstName: { type: String },
            lastName: { type: String },
            email: { type: String, lowercase: true },
            role: {
                type: String,
                enum: ENUMS.USER_ROLES
            },
            hashedPassword: { type: String },
            salt: { type: String },
            provider: { type: String, enum: ENUMS.AUTH_TYPES, default: ENUMS.DEFAULT_AUTH_TYPES },
            isActive: { type: Boolean, default: true },
            isBlock: { type: Boolean, default: false }
        }, { timestamps: true });

    /**
     * Virtuals
     */
    UserSchema
        .virtual('password')
        .set(function (password) {
            this._password = password;
            this.salt = this.makeSalt();
            this.hashedPassword = this.encryptPassword(password);
        })
        .get(function () {
            return this._password;
        });

    /**
     * Validations
     */

    // Validate empty email
    UserSchema
        .path('email')
        .validate(function (email) {
            if (email && email.length > 0) return true;
            return false
        }, 'Email cannot be blank');

    // Validate empty password
    UserSchema
        .path('hashedPassword')
        .validate(function (hashedPassword) {
            return hashedPassword.length;
        }, 'Password cannot be blank');

    // Validate email is not taken
    UserSchema
        .path('email')
        .validate(async function (value) {
            const repsonse = await this.constructor.findOne({ email: value });
            if (repsonse && repsonse.email) return false;
            return true;
        }, 'The specified email address is already in use.');

    /**
     * Pre-save hook
     */
    UserSchema
        .pre('save', function (next) {
            if (!this.isNew)
                return next();
            if (!this.email)
                next(new Error('Invalid email'));
            else
                next();
        });

    /**
     * Methods
     */
    UserSchema.methods = {
        /**
         * Authenticate - check if the passwords are the same
         *
         * @param {String} plainText
         * @return {Boolean}
         * @api public
         */
        authenticate: function (plainText) {
            return this.encryptPassword(plainText) === this.hashedPassword;
        },
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
         * Encrypt password
         *
         * @param {String} password
         * @return {String}
         * @api public
         */
        encryptPassword: function (password) {
            // console.log("encryptPassword", password, "this.salt", this.salt)
            if (!password || !this.salt)
                return '';
            const salt = new Buffer(this.salt, 'base64');
            return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
        }
    };

    module.exports = mongoose.connections[Services.getObjectIndex(mongoose.connections, "name", process.env.WISSEN_DB_NAME)]
        .model(ENUMS.WISSEN_DB_COLLECTIONS.USER.name, UserSchema, ENUMS.WISSEN_DB_COLLECTIONS.USER.name);
}());