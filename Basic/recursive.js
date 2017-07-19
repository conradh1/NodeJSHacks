var request = require('request');
var fs = require("fs");
var jsonData = [];
var data;
var page = 2;
var last_page = 3;

(function loop() {
    if (page <= last_page) {
		var n = page *120;
        request("https://honolulu.craigslist.org/search/cta?s=" + n, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                jsonData.push(body);
            }
            page++;
            loop();
        });
    }
}());

console.log("json length: "+jsonData.length);
console.log("json length: "+jsonData[0]);