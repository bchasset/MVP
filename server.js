var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

console.log(process.env.PORT);

var databasepath = 'mongodb://heroku_1d9l0rzh:ovf5eqhue1lv6hklqkii09l7ue@ds127399.mlab.com:27399/heroku_1d9l0rzh';

mongoose.connect(databasepath);

app.listen(process.env.PORT || 3000);

var workoutSchema = mongoose.Schema({
  name: String,
  link: String,
  benchPressGain: Number,
  squatGain: Number,
  deadliftGain: Number,
  totalRatings: Number,
  outOfTen: Number
});

var Workout = mongoose.model('Workout', workoutSchema);

// Workout.remove({}, function(err) {
//   console.log('removed');
// })

app.post('/workouts', function(req, res) {
  console.log(req.body.name);
  var thing = new Workout({
    name: req.body.name,
    link: req.body.link,
    benchPressGain: req.body.benchPressGain,
    squatGain: req.body.squatGain,
    deadliftGain: req.body.deadliftGain,
    outOfTen: req.body.outOfTen,
    totalRatings: 1
  });
  console.log('posted', thing);
  thing.save(function(err, thing) {
    if(err) {
      return console.error(err);
    } else {
      res.status(200).send('success');
    }
  })
})

app.get('/workouts', function(req, res) {
  Workout.find(function(err, workouts) {
    res.status(200).send(workouts);
  })
})

app.post('/updateworkout', function(req, res) {
  console.log(req.body.name);
  Workout.findOne({
    name: req.body.name
  }, function(err, workout) {
    if(err) {
      return console.error(err);
    } else {
      console.log('wut is workout-------', workout, typeof workout);
      workout.totalRatings++;
      workout.benchPressGain += req.body.benchPressGain;
      workout.squatGain += req.body.squatGain;
      workout.deadliftGain += req.body.deadliftGain;
      workout.outOfTen += req.body.outOfTen;
      console.log('workout after adding stuff-------', workout);
      workout.save(function(err, workout) {
        if(err) {
          return console.error(err);
        } else {
          res.status(200).send('updated')
        }
      })
    }
  })
})