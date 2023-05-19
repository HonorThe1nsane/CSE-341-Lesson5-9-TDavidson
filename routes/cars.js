const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
const { check, validationResult } = require('express-validator');


router.get('/', carsController.getData);

router.get('/:id', carsController.getSingleData);

router.post('/', carsController.createNewCar);

router.put('/:id', carsController.updateCar);



module.exports = router;

