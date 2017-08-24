const Bookshelf = require('../bookshelf');
require('./albumModel');

const Album = Bookshelf.Model.extend({
  tableName: 'albums',
  hasTimestamps: true,
  artist() {
    return this.belongsTo('Artist');
  },
});

module.exports = Bookshelf.model('Album', Album);
