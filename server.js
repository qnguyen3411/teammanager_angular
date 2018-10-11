const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(express.static( __dirname + '/./public/dist/public' ));
app.use(bodyParser.json())

app.listen(8000, () => {
  console.log("LISTENING TO PORT 8000")
})

mongoose.connect('mongodb://localhost/players');
mongoose.Promise = global.Promise;

const PlayerSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Name is required'], minlength: [2, 'Name gotta be at least 2 letters']},
  position: {type: String, default: "Nothing"},
  game1: {type: Number, default: 0},
  game2: {type: Number, default: 0},
  game3: {type: Number, default: 0}
})

mongoose.model('Player', PlayerSchema);
const Player = mongoose.model('Player');

app.get('/api/players', (req, res) => {
  Player.find().then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})

app.post('/api/players', (req, res) => {
  Player.create(req.body).then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})

app.put('/api/players/:id', (req, res) => {
  Player.findByIdAndUpdate(
    req.params.id, req.body,
    {runValidators: true, new: true})
  .then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})

app.delete('/api/players/:id', (req, res) => {
  Player.findByIdAndDelete(req.params.id).then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})


app.all("*", (req,res) => {
  res.sendFile(__dirname + "/./public/dist/public/index.html")
});