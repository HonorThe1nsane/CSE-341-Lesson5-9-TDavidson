const express = require('express');
const router = express.Router();
const personController = require('../controllers/person');
const { check, validationResult } = require('express-validator');



// GET /feed/posts

router.get('/', personController.getData);

router.get('/:id', personController.getSingleData);



router.post('/', carsController.createNewPerson(req, res));

router.put('/:id', personController.updatePerson);

router.delete('/:id', personController.deletePerson);

module.exports = router;
