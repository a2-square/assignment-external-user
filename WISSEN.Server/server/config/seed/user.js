/**
 * Code to Populate DB with dummy data on starting the server
 */

'use strict';

var User = require('../../api/user/user.model');
var ENUMS = require('../../enums');
var chalk = require('chalk');

const seedAdminUser = async () => {
    try {
        let userCount = await User.countDocuments();
        if (userCount < 1) {
            let adminDetails = {
                "provider": 'local',
                "firstName": 'Wissen',
                "lastName": 'Administration',
                "email": 'admin@wissen.com',
                "password": 'admin',
                "role": ENUMS.USER_ROLES_OBJ.ADMIN.name
            };
            const result = await User.create(adminDetails);
            console.log(chalk.green('Hey! %s Default admin of application has been successfully seeded in database'), process.env.USER);
        }
    } catch (err) {
        console.log(chalk.red('Hey! %s Error occured while seeding default admin of application in database'), process.env.USER);
    }
}

module.exports = {
    seedAdminUser
};