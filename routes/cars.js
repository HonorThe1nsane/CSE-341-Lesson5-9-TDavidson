const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
const { check, validationResult } = require('express-validator');


// GET /feed/posts

router.get('/', carsController.getData);

router.get('/:id', carsController.getSingleData);

// router.post('/', carsController.createNewCar);

router.post('/',
    check('carMake', 'Car make is required').not().isEmpty().trim().escape(),
    console.log('carMake has been validated'),
    check('carModel', 'Car model is required').not().isEmpty().trim().escape(),
    console.log('carModel has been validated'),
    check('engineSize', 'Engine size is required').not().isEmpty().trim().escape(),
    console.log('engineSize has been validated'),
    check('color', 'Color is required').not().isEmpty().trim().escape(),
    console.log('color has been validated'),
    check('year', 'Year is required').not().isEmpty().trim().escape(),
    console.log('Year has been validated'),
    check('price', 'Price is required').not().isEmpty().trim().escape(),
    console.log('Price has been validated'),
    check(req.body, 'Request body cannot be empty').not().isEmpty(),

    (reg, res) => {
        const errors = validationResult(reg);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        carsController.createNewcar(reg, res)
    });

router.put('/:id', carsController.updateCar);

router.delete('/:id', carsController.deleteCar);
// localhost:8080
module.exports = router;

