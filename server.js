const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demoApp',{userNewUrlParser: true, useUnifiedTechnology: true})

const Mood = require('./models/mood');

app.get('/', (req, res) => {
  res.send('mood app');
});

app.get('/moods', (req, res) => {
  Mood.find({}, (err, databaseResponse)=> {
    res.send(databaseResponse);
  });
});

app.post('/moods', (req, res) => {
  // create the new mood
  let newMood = new Mood({
    emotion: res.body.emotion,
    intensity: req.body.intensity
  });
  // save it
  newMood.save().then(moodData => {
    res.send(moodData);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));