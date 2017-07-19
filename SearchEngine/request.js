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
for (pool in pools) {
    var url = 'http://www.thprd.org/schedules/schedule.cfm?cs_id=' + pools[pool];

    request(url, (function(pool) { return function(err, resp, body) {
		console.log("Pool: "+pool);
		fs.appendFileSync("./test.txt", pool+"\n");
    }})(pool));
}

// var contents = fs.readFileSync("./test.txt").toString();
//   console.log("file: "+contents);

