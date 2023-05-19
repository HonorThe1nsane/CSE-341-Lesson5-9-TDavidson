const express = require('express');
const router = express.Router();
const personController = require('../controllers/person');




// GET /feed/posts

router.get('/', personController.getData);

router.get('/:id', personController.getSingleData);



router.post('/', personController.createNewPerson);

router.put('/:id', personController.updatePerson);



module.exports = router;
