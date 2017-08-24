const express = require('express');
const ArtistRoutes = require('./artistRoutes');
const AlbumRoutes = require('./albumRoutes');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome!' });
});

app.use('/artists', ArtistRoutes);
app.use('/albums', AlbumRoutes);

module.exports = app;
