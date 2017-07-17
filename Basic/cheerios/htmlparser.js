var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

exports.extractHTML = function () {

	var title, price, link;
	var jsonData = [];
	var fs  = require("fs");
        //cheerio.load(fs.readFileSync('path/to/file.html'));
	var htmlString = fs.readFileSync('tmp/sample.html').toString();
	var $ = cheerio.load(htmlString);
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
	return JSON.stringify(jsonData);
};
