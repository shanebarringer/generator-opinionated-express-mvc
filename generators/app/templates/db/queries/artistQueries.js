const Artist = require('../../models/artistModel');
const Base = require('./baseQueries');

const getAll = () => Base.getAll(Artist);

const getOne = id => Base.getOne(Artist)(id, 'albums');

const add = artist => Base.add(Artist)(artist);

const update = (id, body) => Base.update(Artist)(id, body);

module.exports = { getAll, getOne, add, update };
