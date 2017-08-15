exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("albums", function(table) {
   table.increments('id').primary();
   table.string('title');
   table.integer("artist_id").notNullable().references("id").inTable("artists");
   table.timestamps(true, true);
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("albums")
};
