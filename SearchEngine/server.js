var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var cgParser = require('./cgParser.js');
var app = express();

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
  var keywords = req.params.keywords;
  var jsonData = cgParser.extractHTML();
  console.log("HTML Parse: " +JSON.stringify(jsonData));
  console.log("Get called Keywords Submitted: "+keywords);    
	res.json(jsonData);
});
