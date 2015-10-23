var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser'); 
var request = require('request');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

var usersFilePath = path.join(__dirname, 'file.json');

app.get('/list', function(req, res) {
	request('http://semantical.s3-eu-west-1.amazonaws.com/file.json', function (error, response, body) {
	  if (error) {
	  	res.send(error);
	  };
	  res.send(body);
	})
    
});

app.post('/list', function(req, res) {

	request({
		url:'http://semantical.s3-eu-west-1.amazonaws.com/file.json',
		method:'PUT',
		json : true,
		body : req.body}
		, function (error, response, body) {
			  if(error){
			  	res.send(error);
			  }
			 res.send(response);
		})

});

app.listen(8080);
console.log('port 8080.');
