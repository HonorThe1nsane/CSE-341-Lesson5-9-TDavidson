const { check, validationResult } = require('express-validator');

const carValidation = (req, res, next) => {
    // Define the validation rules


    check('carMake', 'Car make is required').not().isEmpty().trim().escape();
    check('carModel', 'Car model is required').not().isEmpty().trim().escape();
    check('engineSize', 'Engine size is required').not().isEmpty().trim().escape();
    check('favoriteColor', 'Color is required').not().isEmpty().trim().escape();
    check('year', 'Year is required').not().isEmpty().trim().escape();
    check('price', 'Price is required').not().isEmpty().trim().escape();

    check(req.body, 'Request body cannot be empty').not().isEmpty();

    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

const personValidation = (req, res, next) => {

    check('firstName', 'First Name is required').not().isEmpty().trim().escape();
    check('lastName', 'Last Name is required').not().isEmpty().trim().escape();
    check('email', 'Email is required').not().isEmpty().trim().escape();
    check('birthday', 'Birthday is required').not().isEmpty().trim().escape();

    check(req.body, 'Request body cannot be empty').not().isEmpty();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


module.exports = { carValidation, personValidation };