var express = require('express');
var app = express();
var cgParser = require('./cgParser.js');
var bodyParser = require('body-parser')

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
	cgParser.getSiteAvg(req, res);
});
