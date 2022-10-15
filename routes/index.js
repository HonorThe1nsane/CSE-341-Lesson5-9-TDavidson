const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


router.use('/Hot-cars', require('./cars'));
router.use('/', require('./swagger'));

module.exports = router;