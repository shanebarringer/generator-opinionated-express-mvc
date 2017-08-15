exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("artists", function(table) {
   table.increments('id').primary();
   table.string('name');
   table.string('genre');
   table.timestamps(true, true);
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("artists")
};
