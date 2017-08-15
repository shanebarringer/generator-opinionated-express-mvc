const Album = require(__dirname + '/../models/albumModel');

exports.index = (req, res, next) => {
  return Album
    .fetchAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({error: error}))
}
