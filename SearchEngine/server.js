var express = require('express');
var bodyParser = require('body-parser');
var app = express();

/* ==========================================================
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public'));

app.listen(8080, function() {
  console.log('Server listening on port 8080');
});

app.get('/home/:keywords', function (req, res) {
  var keywords = req.params.keywords;
  console.log("Keywords Submitted: "+keywords);
});