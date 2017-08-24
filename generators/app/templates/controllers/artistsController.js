require('../models/artistModel');
const ArtistQueries = require('../db/queries/artistQueries');
const chalk = require('chalk');

const handleErrors = (error, response) => {
  console.log(chalk.red(error));
  response.status(404).json(error.message);
};

exports.index = (req, res) => (
  ArtistQueries.getAll()
  .then(artists => res.status(200).json(artists))
  .catch(err => handleErrors(err, res))
);

exports.show = (req, res) => (
  ArtistQueries.getOne(req.params.id)
  .then(artist => res.status(200).json(artist))
  .catch(err => handleErrors(err, res))
);

exports.create = (req, res) => (
  ArtistQueries.add(req.body)
  .then(artist => res.status(201).json(artist))
  .catch(err => handleErrors(err, res))
);

exports.update = (req, res) => (
  ArtistQueries.update(req.params.id, req.body)
  .then(artist => res.status(200).json(artist))
  .catch(err => handleErrors(err, res))
);

exports.delete = (req, res) => (
  ArtistQueries.getOne(req.params.id)
  .then(artist => {
    if (!artist) {
      res.status(404).json({ message: 'Artist not found' });
    } else {
      artist.destroy()
      .then(() => {
        res.status(200).json({ message: 'Artist deleted' });
      });
    }
  })
  .catch(err => handleErrors(err, res))
);
