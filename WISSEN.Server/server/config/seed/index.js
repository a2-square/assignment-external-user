/**
 * Code to Seed DB with dummy data on starting the server
 */

'use strict';
var userSeed = require('./user');

if (process.env.NODE_ENV == 'production') {
    userSeed.seedAdminUser();
} else if (process.env.NODE_ENV == 'development') {
    userSeed.seedAdminUser();
} else {
    throw new Error('Seeding Error: select enviroment either production or development');
    process.exit(-1);
}