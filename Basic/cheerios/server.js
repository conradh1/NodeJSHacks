var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var htmlparser = require('./htmlparser.js');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Hello HTML Parser.");
    res.write("<pre>" +htmlparser.extractHTML()+"</pre>");
	
	console.log('Server listening on port 8080');
	console.log("HTML Parse: " +htmlparser.extractHTML());
	res.end();
    
}).listen(8080);
