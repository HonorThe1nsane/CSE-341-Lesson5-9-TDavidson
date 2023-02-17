// const { check, validationResult } = require('express-validator');

// const carValidation = (req, res, next) => {
//     // Define the validation rules


//     check('carMake', 'Car make is required').not().isEmpty().trim().escape();
//     console.log('carMake has been validated');
//     check('carModel', 'Car model is required').not().isEmpty().trim().escape();
//     console.log('carModel has been validated');
//     check('engineSize', 'Engine size is required').not().isEmpty().trim().escape();
//     console.log('engineSize has been validated');
//     check('color', 'Color is required').not().isEmpty().trim().escape();
//     console.log('color has been validated');
//     check('year', 'Year is required').not().isEmpty().trim().escape();
//     console.log('Year has been validated');
//     check('price', 'Price is required').not().isEmpty().trim().escape();
//     console.log('Price has been validated');

//     check(req.body, 'Request body cannot be empty').not().isEmpty();

//     // Check if there are any validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.log(errors.array());
//         return res.status(400).json({ errors: errors.array() });
//     }

//     next();
// };

// // const personValidation = (req, res, next) => {

// //     check('firstName', 'First Name is required').not().isEmpty().trim().escape(),

// //         check('lastName', 'Last Name is required').not().isEmpty().trim().escape(),

// //         check('email', 'Email is required').not().isEmpty().trim().escape(),

// //         check('birthday', 'Birthday is required').not().isEmpty().trim().escape(),
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //         console.log(errors.array());
// //         return res.status(400).json({ errors: errors.array() });
// //     }
// //     next();
// // };


// module.exports = { carValidation, personValidation };