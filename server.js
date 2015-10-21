
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

 fs.readFile("file.json", "utf-8", function(err, data){
    if(err) throw err;
     
     res.send(data);
  });


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

app.listen(8080);
console.log('port 8080.');