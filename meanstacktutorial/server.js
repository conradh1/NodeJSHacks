// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');
	person1= {
        name: 'Tim',
        email: 'tim@gmail.com',
        number:'(571) 426-1433'
    };

    person2 = {
        name:'Liam',
        email:'neason@taken2.com',
        number: '(777) 777-7777'
    };

    person3={
        name: 'Jessie',
        email:'jessie@vma.com',
        number: '(684) 426-1232'
    };
	var contactlist = [person1, person2, person3];
	res.json(contactlist);
//   db.contactlist.find(function (err, docs) {
//     console.log(docs);
//     res.json(docs);
//   });
});

// app.post('/contactlist', function (req, res) {
//   console.log(req.body);
//   db.contactlist.insert(req.body, function(err, doc) {
//     res.json(doc);
//   });
// });
//
// app.delete('/contactlist/:id', function (req, res) {
//   var id = req.params.id;
//   console.log(id);
//   db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
//     res.json(doc);
//   });
// });
//
// app.get('/contactlist/:id', function (req, res) {
//   var id = req.params.id;
//   console.log(id);
//   db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
//     res.json(doc);
//   });
// });
//
// app.put('/contactlist/:id', function (req, res) {
//   var id = req.params.id;
//   console.log(req.body.name);
//   db.contactlist.findAndModify({
//     query: {_id: mongojs.ObjectId(id)},
//     update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
//     new: true}, function (err, doc) {
//       res.json(doc);
//     }
//   );
// });

app.listen(3000);
console.log("Server running on port 3000");