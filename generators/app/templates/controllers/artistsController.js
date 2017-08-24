const Artist = require(`${__dirname}/../models/artistModel`);
const ArtistQueries = require(`${__dirname}/../db/queries/artistQueries`);
const chalk = require('chalk');

exports.index = (req, res, next) => (
  ArtistQueries.getAll()
  .then((artists) => res.status(200).json(artists))
  .catch(err => handleErrors(err, res))
);

exports.show = (req, res, next) => (
  ArtistQueries.getOne(req.params.id)
  .then(artist => res.status(200).json(artist))
  .catch((err) => handleErrors(err, res))
);

exports.create = (req, res, next) => (
  ArtistQueries.add(req.body)
  .then(artist => res.status(201).json(artist))
  .catch(err => handleErrors(err, res))
);

exports.update = (req, res, next) => (
  ArtistQueries.update(req.params.id, req.body)
  .then(artist => res.status(200).json(artist))
  .catch(err => handleErrors(err, res))
);

exports.delete = (req, res, next) => (
  ArtistQueries.getOne(req.params.id)
  .then(artist => {
    if (!artist) {
      res.status(404).json({ message: 'Artist not found' });
    }
    else {
      artist.destroy()
        .then(() => {
          res.status(200).json({ message: 'Artist deleted' });
      })
    }
  })
  .catch(err => handleErrors(err, res))
);

const handleErrors = (error, response) => {
  console.log(chalk.red(error));
  response.status(404).json(error.message);
};
