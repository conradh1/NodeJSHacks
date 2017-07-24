"use strict";

var request = require('request-promise')
var cheerio = require('cheerio')

var headers = {  
    'User-Agent': 'scottwrobinson'
};

var jsonData = [];

var suffixURL = '.craigslist.org/search/cta?query=lotus';
var prefixURL = 'https://';
var cities = ['honolulu', 'phoenix', 'denver'];


async function parseGL() {  
    let reqs = cities.map(async function(city) {
		try {  
			var body = await request.get(prefixURL+city+suffixURL);
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

			var tmp =  {
				title: title,
				price: price,
				link: link
			};
			jsonData.push(tmp);
		});
	});
    await Promise.all(reqs);
	console.log('Issue titles:');
    jsonData.forEach(function(t) {
        console.log(t);
    });
}

console.log("Calling parseGL");
parseGL();  