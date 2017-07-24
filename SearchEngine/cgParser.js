"use strict";

var request = require('request-promise');
var cheerio = require('cheerio'); 


function entry(city, title, price, link) {
	this.city = city,
	this.title = title,
	this.price = price,
	this.link = link    
}


exports.getSiteAvg = function (req, res) {
	var jsonData = [];
	var keywords = req.params.keywords;
	var baseURL = 'craigslist.org';
	var pathURL = '/search/cta?auto_make_model='+keywords;
	var cities = ['honolulu', 'phoenix', 'denver'];
	
	console.log("Get called Keywords Submitted: "+keywords);

	async function main() {  
    let reqs = cities.map(async function(city) {
		try {  
			var url = 'https://'+city+'.'+baseURL+pathURL;
			console.log("Searching:"+url);
			var body = await request.get(url);
			//console.log(body);
		} catch(err) {
			console.log('Got an error:', err.message)
		}
    
		var price_entries = [];
		//console.log("body: "+body);
		var $ = cheerio.load(body);
		$('li.result-row').each(function(i, element){
			let price = $(element).find('span.result-price').first().text();
			
			var x = parseInt(price.replace(/\$/, ''));
			if (!isNaN(x) && x > 1000 ) {
				console.log("price|"+x+'|');
				price_entries.push(x);
			}
		});
		
		var sum = price_entries.reduce(function(a, b) { return a + b; });
		var avg = (sum / price_entries.length).toFixed(2);
		var tmp =  {
				city: city,
				Average: avg,
				Max: Math.max(...price_entries),
				Min: Math.min(...price_entries),
				Entries: price_entries.length
		};
		jsonData.push(tmp);
	});
    await Promise.all(reqs);
	console.log('Results sent');
    jsonData.forEach(function(t) {
		console.log(t);
    });
	res.json(jsonData);
}

	console.log("Calling main");
	main();  
};


exports.getListings = function (req, res) {
	var jsonData = [];
	var keywords = req.params.keywords;
	var baseURL = 'craigslist.org';
	var pathURL = '/search/cta?auto_make_model='+keywords;
	var cities = ['honolulu', 'phoenix', 'denver'];

	console.log("Get called Keywords Submitted: "+keywords);

	async function main() {  
    let reqs = cities.map(async function(city) {
		try {  
			var url = 'https://'+city+'.'+baseURL+pathURL;
			console.log("Searching:"+url);
			var body = await request.get(url);
			//console.log(body);
		} catch(err) {
			console.log('Got an error:', err.message)
		}
        
		//console.log("body: "+body);
		var $ = cheerio.load(body);
		$('li.result-row').each(function(i, element){
			let price = $(element).find('span.result-price').first().text();
			let title = $(element).find('a.hdrlnk').text();
			let link  = $(element).find('a.hdrlnk').attr('href');

			if (/http/.test(link) == false) {
					link = 'https://'+city+'.'+baseURL+link;
					console.log(link);
			}
// 			var entryObj = new entry(city, title, price, link);
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

