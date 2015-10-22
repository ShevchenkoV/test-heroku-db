var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser'); 

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

     
     res.send("http://semantical.s3-eu-west-1.amazonaws.com/file.json");



});

app.post('/list', function(req, res) {
	
	fs.writeFile("file.json",JSON.stringify(req.body), function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
    	res.send("ok");
	});



});

/*
	var http = require('http'),
    request = require('request');

http.createServer(function(req, res) {
    res.setHeader("content-disposition", "attachment; filename=file.json");
    request('http://semantical.s3-eu-west-1.amazonaws.com/file.json').pipe(res);
}).listen(8080);

*/


app.listen(8080);
console.log('port 8080.');
