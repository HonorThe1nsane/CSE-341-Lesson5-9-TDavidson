const express = require('express');
const router = express.Router();
const personController = require('../controllers/person');
const { check, validationResult } = require('express-validator');
// const personValidation = require('./validation');
// import { personValidation } from '../controllers/validation';
// const personValidation = require('../controllers/validation');


// GET /feed/posts

router.get('/', personController.getData);

router.get('/:id', personController.getSingleData);

// router.post('/', personController.createNewPerson);

router.post('/', [
    check('firstName', 'First Name is required').not().isEmpty().trim().escape(),
    check('lastName', 'Last Name is required').not().isEmpty().trim().escape(),
    check('email', 'Email is required').not().isEmpty().trim().escape(),
    check('birthday', 'Birthday is required').not().isEmpty().trim().escape(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    carsController.createNewPerson(req, res)
});

router.put('/:id', personController.updatePerson);

router.delete('/:id', personController.deletePerson);
// localhost:8080
module.exports = router;
