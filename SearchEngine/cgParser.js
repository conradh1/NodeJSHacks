"use strict";

var request = require('request-promise');
var cheerio = require('cheerio'); 


function entry(city, title, price, link) {
	this.city = city,
	this.title = title,
	this.price = price,
	this.link = link    
}

exports.extractHTML = function (req, res) {
	var jsonData = [];
	var keywords = req.params.keywords;
	var suffixURL = '.craigslist.org/search/cta?query=';
	var prefixURL = 'https://';
	var cities = ['honolulu', 'phoenix', 'denver'];

	console.log("Get called Keywords Submitted: "+keywords);

	// url used to search yql
	var url = 'https://honolulu.craigslist.org/search/cta?query='+keywords;

	async function main() {  
    let reqs = cities.map(async function(city) {
		try {  
			var body = await request.get(prefixURL+city+suffixURL+keywords);
			//console.log(body);
		} catch(err) {
			console.log('Got an error:', err.message)
		}
        
		//console.log("body: "+body);
		console.log("city:"+city);
		var $ = cheerio.load(body);
		$('li.result-row').each(function(i, element){
			let price = $(element).find('span.result-price').first().text();
			let title = $(element).find('a.hdrlnk').text();
			let link  = $(element).find('a.hdrlnk').attr('href');

// 			var entryObj = new entry(city, price, title, link);
// 			jsonData.push(JSON.parse(entryObj));
			var tmp =  {
				city: city,
				title: title,
				price: price,
				link: link
			};
			jsonData.push(tmp);
		});
	});
    await Promise.all(reqs);
	console.log('Results sent');
//     jsonData.forEach(function(t) {
//         console.log(t);
//     });
	res.json(jsonData);
}

	console.log("Calling main");
	main();  
};
