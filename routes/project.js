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
	console.log('asdfas')
	// if (req.url === '/') {
	// 	readAllProjectItemsFromDB();
	// 	setTimeout(function(){
	// 		res.json(cityItems);
	// 	}, 200);
	// } else {
	// 	parseRequestString(req.url)
	// }
});


function parseRequestString(stringToParse) {
	console.log("searching for " + stringToParse);
}

function readAllProjectItemsFromDB() {
	projectItems = [];
	var ref = firebase.database().ref("project");
	ref.on("child_added", function(snapshot) {
		var projectItemToAdd = new Project(snapshot.key, snapshot.val().id, snapshot.val().projectManager, snapshot.val().projectStartDate, snapshot.val().projectEndDate, snapshot.val().city);
		projectItems.push(projectItemToAdd);
	})
}

module.exports = router;