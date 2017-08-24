require('../bookshelf');

const Album = require('../models/albumModel');
const Artist = require('../models/artistModel');
const seedData = require('./seedData');

function deleteAll(model) {
  return model.where('id', '!=', 0).destroy();
}

async function seed() {
  await deleteAll(Album);        // DELETE all of the albums.
  await deleteAll(Artist);       // DELETE all of the artists.

  // Create the Artists
  const savedArtists = await Promise.all(seedData.map(data => new Artist(data.artist).save()));

  // Create the Albums
  const mapper = (artist, index) =>
    seedData[index].albums.map(album => artist.albums().create(album));

  // this is how you do flatten in JavaScript
  const promises = [].concat(...savedArtists.map(mapper));
  await Promise.all(promises);

  console.log('data seeded!');

  // disconnect from database
  process.exit(0);
  // bookshelf.knex.destroy().then(() => console.log('db connections destroyed'));
}

try {
  seed();
} catch (err) {
  console.error('ERROR:', err);
  process.exit(1);
}
