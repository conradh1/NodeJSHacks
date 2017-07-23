"use strict";

var request = require('request-promise');


var headers = {  
    'User-Agent': 'scottwrobinson'
};

var repos = [  
    'scottwrobinson/camo',
    'facebook/react',
    'scottwrobinson/twentyjs',
    'moment/moment',
    'nodejs/node',
    'lodash/lodash'
];

var issueTitles = [];

async function main() {  
    let reqs = repos.map(async function(r) {
        let options = { url: 'https://api.github.com/repos/' + r, headers: headers };
        let body = await request.get(options);
        let json = JSON.parse(body);

        if (json.has_issues) {
            let issuesOptions = { url: 'https://api.github.com/repos/' + r + '/issues', headers: headers };
            let ibody = await request.get(issuesOptions);
            let issuesJson = JSON.parse(ibody);

            if (issuesJson[0]) {
                issueTitles.push(issuesJson[0].title);
            }
        }
    });

    await Promise.all(reqs);
}

main();  
