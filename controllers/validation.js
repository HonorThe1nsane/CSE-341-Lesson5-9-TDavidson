const { check } = require('express-validator');

exports.personValidation = [
    check('firstName','First Name is required').not().isEmpty().trim().escape(),
    check('lastName','Last Name is required').not().isEmpty().trim().escape(),
    check('email','Email is required').not().isEmpty().trim().escape(),
    check('birthday','Birthday is required').not().isEmpty().trim().escape()
]

exports.carValidator = [
    check('carMake', 'carMake is required').not().isEmpty(),
    check('carModel', 'carModel is required').not().isEmpty(),
    check('engineSize', 'engineSize is required').not().isEmpty(),
    check('color', 'color is required').not().isEmpty(),
    check('year', 'year is required').not().isEmpty(),
    check('price', 'price is required').not().isEmpty(),
];