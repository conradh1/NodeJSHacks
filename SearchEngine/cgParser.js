var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

exports.extractHTML = function (req, res) {
	var jsonData = [];
	var keywords = req.params.keywords;
	var title, price, link;

	console.log("Get called Keywords Submitted: "+keywords);

	// url used to search yql
	var url = 'https://honolulu.craigslist.org/search/cta?query='+keywords;
	console.log(url);

	// request module is used to process the yql url and return the results in JSON format
	request(url, function(err, resp, body) {
		// logic used to compare search results with the input from user
		console.log("body: "+body);
		var $ = cheerio.load(body);
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
		// pass back the results to client side
		res.json(jsonData);
	});
};