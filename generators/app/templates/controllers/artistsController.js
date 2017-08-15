const Artist = require(__dirname + '/../models/artistModel');

exports.index = (req, res, next) => {
  return Artist
    .fetchAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({error: error}))
}
