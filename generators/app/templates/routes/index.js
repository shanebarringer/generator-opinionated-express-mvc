const express = require('express');
const app = express();
const ArtistRoutes = require('./artistRoutes');
const AlbumRoutes = require('./albumRoutes');


app.get('/', (req, res) => {
  res.status(200).json({message: "welcome!"})
})

app.use('/artists', ArtistRoutes)
app.use('/albums', AlbumRoutes)

module.exports = app
