var express    = require("express");
var app        = express();
var server     = {};
var path       = require("path");
var controller = require("../controller/AppController");

app.set('views',  __dirname + '/view');
app.engine('html', require('ejs').renderFile);

// get index
app.get('/home', function (req, res) {
	controller.pageHandler(req, res);
});

// load users
app.get('/loadUsers', function (req, res) {
	controller.getUsers(req, res);
});

// register user data
app.get('/register', function (req, res){
	controller.registerUser(req, res);
});

// update user data
app.get('/update/:id', function (req, res) {
	res.send(req.params.id);
});

// set port to listen
exports.initRoute = function(){
	server = app.listen(81, function () {
	  var host = server.address().address;
	  var port = server.address().port;
	});
}