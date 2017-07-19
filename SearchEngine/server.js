var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var cgParser = require('./cgParser.js');

/* ==========================================================
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(8000, function() {
  console.log('Server listening on port 8000');
});


/* ==========================================================
handle the Search function
============================================================ */
app.get('/home/:keywords', function (req, res) {
	cgParser.extractHTML(req, res);
});
