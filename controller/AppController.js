var express    = require("express");
var app        = express();
var db         = require("../model/db.js");
var url        = require("url");
var path       = require("path");
var crypto     = require("crypto");
var cryptoAlgo = 'aes-256-ctr';
var cryptoPass = 'd6F3Efeq';
var defer    = require('deferred');

// cipher password
function encrypt (text) {
  var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

// handle pages
exports.pageHandler = function (req, res) {
	// render index
	res.render(__dirname + "/../view/index.html", {title : "Express"});
};

// register user
exports.registerUser = function (req, res, next) {
	// check if user exists
	db.users
	.findAll(
		{
			attributes : ['id'],
			where : {
				email : req.query.uemail,
				status : 1
			}
		}
	)
	.then(function(user){
		// check if user exists
		if (user.length != 0) {
			res.json({status : 500, content : "user_exists"});
			return false;
		}

		// if not, create user
		db.users
		.create({
			name : req.query.uname,
			email : req.query.uemail,
			password : encrypt(req.query.upassword),
			status : 1
		})
		.then(function(){
			res.json({status : 200, content : "user_registered"});
			return false;
		});
	});
}

// get users
exports.getUsers = function (req, res, next) {
	db.users
	.findAll({
		where : {
			status : 1
		}
	})
	.then(function(users){
		res.json({'users' : users});
	});
}

// update user
exports.getUpdateUser = function (req, res) {
}