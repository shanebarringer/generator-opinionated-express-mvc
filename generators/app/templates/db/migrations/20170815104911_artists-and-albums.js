exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('artists', table => {
    table.increments('id').primary();
    table.string('name').unique();
    table.string('genre');
    table.timestamps(true, true);
  })
  .then(() => knex.schema.createTableIfNotExists('albums', table => {
    table.increments('id').primary();
    table.string('title');
    table.timestamps(true, true);
  }))
  .then(() => knex.schema.table('albums', table => {
    table.integer('artist_id').unsigned();
    table.foreign('artist_id').references('artists.id');
  }));
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('albums'),
    knex.schema.dropTableIfExists('artists')
  ]);
};
