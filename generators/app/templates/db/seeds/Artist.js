exports.seed = function(knex, Promise) {
  return knex('artists').del()
    .then(function () {
      // Inserts seed entries
      return knex('artists').insert([
        {name: 'Sufjan Stevens'},
        {name: 'Explosions in The Sky'},
        {name: 'Fleet Foxes'},
        {name: 'Hammock'},
        {name: 'Run the Jewels'},
        {name: 'Lord Huron'},
        {name: 'Charles Bradley'},
        {name: 'Local Natives'},
        {name: 'A Tribe Called Quest'},
        {name: 'Ryan Adams'},
      ]);
    });
};
