const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');


// GET /feed/posts

router.get('/', carsController.getData);

router.get('/:id', carsController.getSingleData);

router.post('/', carsController.createNewCar);

router.put('/:id', carsController.updateCar);

router.delete('/:id', carsController.deleteCar);
// localhost:8080
module.exports = router;

