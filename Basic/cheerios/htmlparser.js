var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

exports.extractHTML = function () {
	var str = ""; 

	var title, price;
	var fs  = require("fs");
        //cheerio.load(fs.readFileSync('path/to/file.html'));
	var htmlString = fs.readFileSync('tmp/sample.html').toString();
	var $ = cheerio.load(htmlString);
	$('li.result-row').each(function(i, element){
		var price = $(element).find('span.result-price').first().text();
		var des = $(element).find('span.result-hood').first().text();
		//console.log(price).first();
		str += "description:"+des+" price: "+price+'\n';
    });      
	return str;
};
