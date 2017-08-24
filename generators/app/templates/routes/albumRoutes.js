const express = require('express');
const AlbumsController = require('../controllers/albumsController');

const router = express.Router();

router.get('/', AlbumsController.index);
router.get('/:id', AlbumsController.show);
router.post('/', AlbumsController.create);
router.put('/:id', AlbumsController.update);
router.delete('/:id', AlbumsController.delete);

module.exports = router;
