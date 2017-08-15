const express = require('express');
const router  = express.Router();
const ArtistsController = require('../controllers/artistsController');

router.get('/', ArtistsController.index);

module.exports = router
