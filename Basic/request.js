var request = require('request');
var fs = require("fs");
var jsonData = [];
var data;


days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
pools = {
    'Aloha': 3,
    'Beaverton': 15,
    'Conestoga': 12,
    'Harman': 11,
    'Raleigh': 6,
    'Somerset': 22,
    'Sunset': 5,
    'Tualatin Hills': 2
};

var n = pools.length;
for (pool in pools) {
    var url = 'http://www.thprd.org/schedules/schedule.cfm?cs_id=' + pools[pool];
	n-= 1;
    request(url, (function(pool,n) { return function(err, resp, body) {
		console.log(n+") Pool: "+pool);
		fs.appendFileSync("./tmp/test.txt", pool+"\n");
		if ( n == 0 ) {
			var contents = fs.readFileSync("./tmp/test.txt").toString();
			console.log("file: "+contents);
		}
    }})(pool,n));
}
