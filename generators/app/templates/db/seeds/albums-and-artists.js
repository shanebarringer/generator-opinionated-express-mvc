exports.seed = function(knex, Promise) {
  return knex('artists').del()
  .then(() => Promise.all([
    knex('artists').insert({ name: 'Sufjan Stevens' }),
    knex('artists').insert({ name: 'Explosions in The Sky' }),
    knex('artists').insert({ name: 'Fleet Foxes' }),
    knex('artists').insert({ name: 'Hammock' }),
    knex('artists').insert({ name: 'Run the Jewels' }),
    knex('artists').insert({ name: 'Lord Huron' }),
    knex('artists').insert({ name: 'Charles Bradley' }),
    knex('artists').insert({ name: 'Local Natives' }),
    knex('artists').insert({ name: 'A Tribe Called Quest' }),
    knex('artists').insert({ name: 'Ryan Adams' })
  ]))
  .then(() => knex('albums').del())
  .then(() => Promise.all([
    knex('albums').insert({ title: 'Greetings from Michigan The Great Lakes State', artist_id: 1 }),
    knex('albums').insert({ title: 'Seven Swans', artist_id: 1 }),
    knex('albums').insert({ title: 'Come on Feel the Illinois', artist_id: 1 }),
    knex('albums').insert({ title: 'Carrie & Lowell', artist_id: 1 }),
    knex('albums').insert({ title: 'The Earth is not a Cold Dead Place', artist_id: 2 }),
    knex('albums').insert({ title: 'Take Care, Take Care, Take Care', artist_id: 2 }),
    knex('albums').insert({ title: 'Fleet Foxes', artist_id: 3 }),
    knex('albums').insert({ title: 'Helplessness Blues', artist_id: 3 }),
    knex('albums').insert({ title: 'Crack-Up', artist_id: 3 }),
    knex('albums').insert({ title: 'Everything and Nothing', artist_id: 4 }),
    knex('albums').insert({ title: 'Oblivion Hymns', artist_id: 4 }),
    knex('albums').insert({ title: 'Run the Jewels', artist_id: 5 }),
    knex('albums').insert({ title: 'Run the Jewels 2', artist_id: 5 }),
    knex('albums').insert({ title: 'Run the Jewels 3', artist_id: 5 }),
    knex('albums').insert({ title: 'Lonesome Dreams', artist_id: 6 }),
    knex('albums').insert({ title: 'Strange Trails', artist_id: 6 }),
    knex('albums').insert({ title: 'Victim of Love', artist_id: 7 }),
    knex('albums').insert({ title: 'Changes', artist_id: 7 }),
    knex('albums').insert({ title: 'No Time for Dreaming', artist_id: 7 }),
    knex('albums').insert({ title: 'Sunlit Youth', artist_id: 8 }),
    knex('albums').insert({ title: 'Hummingbird', artist_id: 8 }),
    knex('albums').insert({ title: 'Gorilla Manor', artist_id: 8 }),
    knex('albums').insert({ title: 'The Low End Theory', artist_id: 9 }),
    knex('albums').insert({ title: 'Midnight Marauders', artist_id: 9 }),
    knex('albums').insert({ title: 'We Got it from Here... Thank You 4 Your Service', artist_id: 9 }),
    knex('albums').insert({ title: 'Heartbreaker', artist_id: 10 }),
    knex('albums').insert({ title: 'Gold', artist_id: 10 }),
    knex('albums').insert({ title: '1989', artist_id: 10 }),
    knex('albums').insert({ title: 'Live at Carnegie Hall', artist_id: 10 })
  ]))
  .then(() => console.log('data seeded!'));
};
