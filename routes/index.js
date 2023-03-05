const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const requiresAuthMiddleware = require('../requireAuth');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

router.use(auth({
    authRequired: false,
    auth0Logout: true,
    secret: process.env.CLIENT_APP_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_APP_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
}));


router.use('/person', requiresAuthMiddleware, require('./person'));
router.use('/cars', requiresAuthMiddleware, require('./cars'));
router.use('/', require('./swagger'));

module.exports = router;