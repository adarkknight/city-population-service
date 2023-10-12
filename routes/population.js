const express = require('express');
const router = express.Router();
const populationController = require('../controllers/populationController.js')
router.get('/population/state/:state/city/:city', populationController.getPopulation);
router.put('/population/state/:state/city/:city', populationController.updatePopulation);
module.exports = router;

