const { check, validationResult } = require('express-validator');

const carValidation = (req, res, next) => {
    // Define the validation rules
    check('carMake', 'Car make is required').not().isEmpty();
    check('carModel', 'Car model is required').not().isEmpty();
    check('engineSize', 'Engine size is required').not().isEmpty();
    check('favoriteColor', 'Color is required').not().isEmpty();
    check('year', 'Year is required').not().isEmpty();
    check('price', 'Price is required').not().isEmpty();

    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

const personValidation = (req, res, next) => {
    // Define the validation rules
    check('firstName', 'First Name is required').not().isEmpty().trim().escape();
    check('lastName', 'Last Name is required').not().isEmpty().trim().escape();
    check('email', 'Email is required').not().isEmpty().trim().escape();
    check('birthday', 'Birthday is required').not().isEmpty().trim().escape();
    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


module.exports = { carValidation, personValidation };