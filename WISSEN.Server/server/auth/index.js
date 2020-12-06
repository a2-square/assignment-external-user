'use strict';

let express = require('express');
let config = require('../config/environment');
let User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);

let router = express.Router();

router.use('/local', require('./local'));

module.exports = router;