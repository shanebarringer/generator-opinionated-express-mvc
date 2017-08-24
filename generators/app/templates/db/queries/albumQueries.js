const Album = require(`${__dirname}/../../models/albumModel`);
const Base = require('./baseQueries');

const getAll = () => Base.getAll(Album);

const getOne = (id) => Base.getOne(Album)(id, 'artist');

const add = album => Base.add(Album)(album);

const update = (id, body) => Base.update(Album)(id, body);

module.exports = { getAll, getOne, add, update };
