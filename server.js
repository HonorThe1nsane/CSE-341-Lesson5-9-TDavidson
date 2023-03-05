const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const utils = require('./utils');
const { auth, requiresAuth } = require('express-openid-connect');

const port = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/', require('./routes'));

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.CLIENT_APP_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_APP_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,

    // Add the following configuration options for OAuth 2.0 authentication
    authorizationParams: {
        response_type: 'code'
    },
    authorizationParamsExtra: {
        // Add any extra parameters required by your OAuth provider
    },
    scope: 'openid profile email', // The scope of the access token
    routes: {
        // Configure the route handlers for handling the OAuth callbacks
        login: false,
        callback: {
            path: '/callback',
            callback: async (req, res, next) => {
                try {
                    const { user } = await req.openidTokens();
                    req.session.accessToken = user.access_token;
                    req.session.refreshToken = user.refresh_token;
                    req.session.expiresAt = Date.now() + user.expires_in * 1000;
                    res.redirect('/');
                } catch (err) {
                    next(err);
                }
            },
            complete: false
        },
        logout: false
    }
};

// Attach the auth router
app.use(auth(config));

// Use the `requiresAuth` middleware to protect a route that requires authentication
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
