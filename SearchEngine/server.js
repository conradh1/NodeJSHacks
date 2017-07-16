var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
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
	var title, price;
	var fs  = require("fs");
        //cheerio.load(fs.readFileSync('path/to/file.html'));
	var htmlString = fs.readFileSync('tmp/sample.html').toString();
	var $ = cheerio.load(htmlString);
	$('li.result-row').each(function(i, element){
		var data = $(this);
		price = data.children().text(); 
		console.log(price);
    });      
	res.json(contactlist);
});
