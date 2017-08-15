const express = require('express');
const router  = express.Router();
const AlbumsController = require('../controllers/albumsController');

router.get('/', AlbumsController.index);

module.exports = router
