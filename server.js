var express = require('express');
var mongoose = require('mongoose');
var app = express();
var Q = require('q');
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var databasepath = process.env.MONGOLAB_URI || 'mongodb://localhost/workout'

mongoose.connect(databasepath);


app.listen(process.env.PORT || 3000);



var testSchema = mongoose.Schema({
  name: String
});

var Test = mongoose.model('Test', testSchema);

app.post('/testingtesting', function(req, res) {
  console.log(req.body.name);
  var thing = new Test({
    name: req.body.name
  });
  thing.save(function(err, thing) {
    if(err) {
      return console.error(err);
    } else {
      res.status(200).send('success');
    }
  })
})

app.get('/testingtesting', function(req, res) {
  Test.find(function(err, tests) {
    res.status(200).send(tests);
  })
})