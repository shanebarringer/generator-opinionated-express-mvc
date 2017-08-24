const getAll = model => model.fetchAll().then(artists => artists);

const getOne = model => (id, related) => model.collection()
.query({ where: { id: Number(id) } })
.fetchOne({ withRelated: [related] })
.catch(err => err)
.then(resource => {
  if (!resource) throw new Error('Record not found');
  return resource;
});

const add = model => resource => model.forge(resource).save();
const update = model => (id, body) => model.forge({ id }).save(body);

module.exports = { getAll, getOne, add, update };
