const express = require('express');
const bodyParser = require('body-parser');
const { Song } = require('./Song');
const { Artist } = require('./Artist');
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({message: 'Server ON'});
});

app.post('/Song', (req, res) => {
  const song = req.body;
  Song.create(song, (err, newSong) => {
    err
    ? res.status(409).send(err)
    : res.status(201).send(newSong);
  });
});

app.post('/artist', (req, res) => {
  const song = req.body;
  Artist.create(song, (err, newSong) => {
    err
    ? res.status(409).send(err)
    : res.status(201).send(newSong);
  });
});

app.get('/Songs', (req, res) => {
  Song.find({Download: true}).populate('Artists').exec()
       .then( (songs) => res.status(200).send(songs))
       .catch( (error) => res.status(409).send(error))
});

app.get('/song/:id', (req, res) => {
  const { id } = req.params
  Song.findById(id).populate('Artists').exec()
      .then( (song) => {
        song 
        ? res.status(200).send(song)
        : res.status(404).send({message: "Song not found"})
      })
      .catch( (error) => res.status(409).send(error))
});

app.get('/search', (req, res) => {
  const { title } = req.query;
  Song.findOne({title}).exec()
  .then( (song) => {
    song 
    ? res.status(200).send(song)
    : res.status(404).send({message: "song not found"})
  })
  .catch( (error) => res.status(409).send(error))
});

app.patch('/song/:id', (req, res) => {
  const { id } = req.params
  const data = req.body
  Song.findByIdAndUpdate(id, {$set: data}, {new: true}).exec()
  .then( (song) => {
    song 
    ? res.status(200).send(song)
    : res.status(404).send({message: "Song not found"})
  })
  .catch( (error) => res.status(409).send(error))
});

app.delete('/song/:id', (req, res) => {
  const { id } = req.params
  Song.findByIdAndUpdate(id, {$set: {Download: false}}, {new: true}).exec()
  .then( (song) => {
    song 
    ? res.status(200).send(song)
    : res.status(404).send({message: "Song not found"})
  })
  .catch( (error) => res.status(409).send(error))
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});