var express = require('express');
var bodyParser = require('body-parser');
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
  console.log("Get called Keywords Submitted: "+keywords);
    person1= {
        name: 'Tim',
        email: 'tim@gmail.com',
        number:'(571) 426-1433'
    };

    person2 = {
        name:'Liam',
        email:'neason@taken2.com',
        number: '(777) 777-7777'
    };

    person3={
        name: 'Jessie',
        email:'jessie@vma.com',
        number: '(684) 426-1232'
    };

	var contactlist = [person1, person2, person3];
	var fs  = require("fs");
	var htmlFile = fs.readFileSync('tmp/cg.html').toString().split('\n');

	for (var i = 0; i < htmlFile.length; i++) {


	}
	res.json(contactlist);
});
