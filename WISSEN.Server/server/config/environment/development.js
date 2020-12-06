'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Server port
    port: process.env.PORT || 3000,

    // MongoDB connection options
    mongo: {
        WISSEN_DB: (process.env.WISSEN_DB__USER && process.env.WISSEN_DB__USER.length > 0 && process.env.WISSEN_DB__PASSWORD && process.env.WISSEN_DB__PASSWORD.length) ? `mongodb://${process.env.WISSEN_DB__USER}:${process.env.WISSEN_DB__PASSWORD}@${process.env.WISSEN_DB_HOST}/${process.env.WISSEN_DB_NAME}` : `mongodb://${process.env.WISSEN_DB_HOST}/${process.env.WISSEN_DB_NAME}`,
        options: {
            useNewUrlParser: true
        },
        // Should we populate the DB with sample data?
        seedDB: process.env.SEED_DB || false,
    }
};