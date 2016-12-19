var express = require('express');

var app = express();

// move config to seprate file config module/object
var port = process.env.PORT || 5000;

// serve all static files:
// need to move these routes to there own module
app.use(express.static('public'));
app.use(express.static('src/views'));
app.get('/', function(req, res) {
	res.send('hello world');
});

// fire up the server:
app.listen(port, function(err) {
	console.log('running server on port: ' + port);
});