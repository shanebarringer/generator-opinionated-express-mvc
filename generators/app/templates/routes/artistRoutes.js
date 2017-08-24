const express = require('express');
const ArtistsController = require('../controllers/artistsController');

const router = express.Router();

router.get('/', ArtistsController.index);
router.get('/:id', ArtistsController.show);
router.post('/', ArtistsController.create);
router.put('/:id', ArtistsController.update);
router.delete('/:id', ArtistsController.delete);

module.exports = router;
