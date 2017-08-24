const Bookshelf = require('../bookshelf');
require('./albumModel');

const Artist = Bookshelf.Model.extend({
  tableName: 'artists',
  hasTimestamps: true,
  albums() {
    return this.hasMany('Album', 'artist_id');
  },
});

module.exports = Bookshelf.model('Artist', Artist);
