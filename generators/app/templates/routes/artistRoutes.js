const express = require('express');
const router  = express.Router();
const ArtistsController = require('../controllers/artistsController');

router.get('/', ArtistsController.index);
router.get('/:id', ArtistsController.show);
router.post('/', ArtistsController.create);
router.put('/:id', ArtistsController.update)
router.delete('/:id', ArtistsController.delete)

module.exports = router
