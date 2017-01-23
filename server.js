var express = require('express');
var mongoose = require('mongoose');
var app = express();

//mongoose.connect();

app.use(express.static(__dirname + '/public'));

app.listen(3000);

// app.get('/', function() {
//   res.send()
// })