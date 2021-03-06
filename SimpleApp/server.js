var express = require('express');
var app = express();

/* ==========================================================
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public'));

app.listen(8080, function() {
  console.log('Server listening on port 8080');
});