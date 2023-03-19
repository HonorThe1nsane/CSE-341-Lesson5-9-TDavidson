const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const requiresAuthMiddleware = require('../requireAuth');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



router.use('/person', require('./person'));
router.use('/cars', require('./cars'));
router.use('/', require('./swagger'));

module.exports = router;