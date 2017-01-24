var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/workout')

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);

// app.get('/', function() {
//   res.send()
// })