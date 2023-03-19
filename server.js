const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv').config();

const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const { auth } = require('express-openid-connect');

// Create a new OAuth2Client instance
const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URL
);

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.GOOGLE_CLIENT_SECRET,
    baseURL: `http://localhost:8080`,
    clientID: process.env.GOOGLE_CLIENT_ID,
    issuerBaseURL: process.env.GOOGLE_OAUTH_REDIRECT_URL
};


const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: process.env.SCOPES,
});



// Redirect the user to the authentication URL
app.get('/login', (req, res) => {
    res.redirect(authUrl);
});

// Exchange the authorization code for an access token
// app.get('/oauth2callback', async (req, res) => {
//     const { code } = req.query;

//     try {
//         const { tokens } = await oAuth2Client.getToken(code);
//         oAuth2Client.setCredentials(tokens);

//         // Use the access token to make API requests
//         const response = await axios.get('https://www.googleapis.com/drive/v3/files', {
//             headers: { Authorization: `Bearer ${oAuth2Client.credentials.access_token}` },
//         });

//         console.log(response.data);
//         res.send(response.data);
//     } catch (error) {
//         console.error(error);
//         res.send('Error!');
//     }
// });


app
    .use(auth(config))
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
