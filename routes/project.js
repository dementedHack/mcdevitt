var express = require('express');
var router = express.Router();
var Project = require('../models/Project');
var firebase = require("firebase");
var projectItems = [];

// var config = {
//     apiKey: "AIzaSyBO1-jjR4Nai6fs_VrcfVwlUmBrPz7WPTE",
//     authDomain: "mcdevitt-69fb0.firebaseapp.com",
//     databaseURL: "https://mcdevitt-69fb0.firebaseio.com",
//     storageBucket: "mcdevitt-69fb0.appspot.com"
//   };
// firebase.initializeApp(config);

var database = firebase.database();

router.get('/', function(req, res, next){
	projectItems = [];
	readCityItemFromDB();
	setTimeout(function(){
		res.json(projectItems);
	}, 200);
	
});

function readCityItemFromDB() {
	projectItems = [];
	var ref = firebase.database().ref("project");
	ref.on("child_added", function(snapshot) {
		projectItems.push(snapshot.val())
	})
}

module.exports = router;