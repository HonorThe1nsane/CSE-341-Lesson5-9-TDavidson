const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/cars');


// GET /feed/posts

router.get('/', contactsController.getData);

router.get('/:id', contactsController.getSingleData);

router.post('/', contactsController.createNewCar);

router.put('/:id', contactsController.updateCar);

router.delete('/:id', contactsController.deleteCar);
// localhost:8080
module.exports = router;

