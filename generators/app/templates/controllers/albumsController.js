const AlbumQueries = require('../db/queries/albumQueries');
const chalk = require('chalk');

const handleErrors = (error, response) => {
  console.log(chalk.red(error));
  response.status(404).json(error.message);
};

exports.index = (req, res) => (
  AlbumQueries.getAll()
  .then(albums => res.status(200).json(albums))
  .catch(err => handleErrors(err, res))
);

exports.show = (req, res) => (
  AlbumQueries.getOne(req.params.id)
  .then(album => res.status(200).json(album))
  .catch(err => handleErrors(err, res))
);

exports.create = (req, res) => (
  AlbumQueries.add(req.body)
  .then(album => res.status(201).json(album))
  .catch(err => handleErrors(err, res))
);

exports.update = (req, res) => (
  AlbumQueries.update(req.params.id, req.body)
  .then(album => res.status(200).json(album))
  .catch(err => handleErrors(err, res))
);

exports.delete = (req, res) => (
  AlbumQueries.getOne(req.params.id)
  .then(album => {
    console.log(album);
    if (!album) {
      res.status(404).json({ message: 'Album not found' });
    } else {
      album.destroy()
      .then(() => {
        res.status(200).json({ message: 'Album deleted' });
      });
    }
  })
  .catch(err => handleErrors(err, res))
);
