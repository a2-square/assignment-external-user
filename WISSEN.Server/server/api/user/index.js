'use strict';

const express = require('express');
const controller = require('./user.controller');
const auth = require('../../auth/auth.service');
var ENUMS = require('../../enums');

const router = express.Router();

router.post('/', controller.submitUserDetails);
router.post('/all', auth.hasRole(ENUMS.USER_ROLES_OBJ.ADMIN.name, true), controller.all);
router.get('/me', auth.isAuthenticated(true), controller.me);

module.exports = router;
