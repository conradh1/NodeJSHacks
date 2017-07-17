var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var html;
var request = require('request');

request('https://honolulu.craigslist.org/search/cta', function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred 
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		//console.log('body:', body); // Print the HTML for the Google homepage. 
		html = body;
		//console.log('html:', html); // Print the HTML for the Google homepage. 
});

exports.extractHTML = function () {
	var title, price, link;
	var jsonData = [];
	
	//var fs  = require("fs");
	//var htmlString = fs.readFileSync('tmp/sample.html').toString();
	//var $ = cheerio.load(htmlString);
	var $ = cheerio.load(html);
	$('li.result-row').each(function(i, element){
		price = $(element).find('span.result-price').first().text();
		title = $(element).find('a.hdrlnk').text();
		link  = $(element).find('a.hdrlnk').attr('href');
		
		var tmp =  {
				title: title,
				price: price,
				link: link
		};
		jsonData.push(tmp);
    });      
	return jsonData;
};