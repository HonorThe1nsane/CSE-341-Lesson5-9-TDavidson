const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv').config();

const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

const port = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Configure OAuth 2.0
passport.use(
    'oauth2',
    new OAuth2Strategy(
        {
            authorizationURL: process.env.AUTH_URL,
            tokenURL: process.env.TOKEN_URL,
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOrCreate({ oauthId: profile.id }, (err, user) => {
                user.accessToken = accessToken;
                user.save((err) => {
                    done(null, user);
                });
            });
        }
    )
);

// Middleware for initializing Passport
app.use(passport.initialize());

// Add the OAuth 2.0 authentication middleware
app.use('/api', passport.authenticate('oauth2', { session: false }));

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
