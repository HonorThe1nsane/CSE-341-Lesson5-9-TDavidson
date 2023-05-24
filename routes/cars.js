const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
const { check, validationResult } = require('express-validator');


router.get('/', carsController.getData);

router.get('/:id', carsController.getSingleData);

router.post('/', [
    check('carMake', 'Car make is required').not().trim().isEmpty().escape(),
    check('carModel', 'Car model is required').not().trim().isEmpty().escape(),
    check('engineSize', 'Engine size is required').not().trim().isEmpty().escape(),
    check('color', 'Color is required').not().trim().isEmpty().escape(),
    check('year', 'Year is required').not().trim().isEmpty().escape(),
    check('price', 'Price is required').not().trim().isEmpty().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    carsController.createNewCar(req, res)
});

router.put('/:id', carsController.updateCar);

router.delete('/:id', carsController.deleteCar);



module.exports = router;

