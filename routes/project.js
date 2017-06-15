var express = require('express');
var router = express.Router();
var Project = require('../models/Project');
var firebase = require("firebase");
var projectItems = [];
var parsedLocationString = "";

// var config = {
//     apiKey: "AIzaSyBO1-jjR4Nai6fs_VrcfVwlUmBrPz7WPTE",
//     authDomain: "mcdevitt-69fb0.firebaseapp.com",
//     databaseURL: "https://mcdevitt-69fb0.firebaseio.com",
//     storageBucket: "mcdevitt-69fb0.appspot.com"
//   };
// firebase.initializeApp(config);

var database = firebase.database();

router.get('/', function(req, res, next){
	if (req.url === '/') {
		//readAllProjectItemsFromDB();
		parsedLocationString = parseRequestString(req.url)
		setTimeout(function(){
			res.json(projectItems);
		}, 200);
	} else {
		parsedLocationString = parseRequestString(req.url)
		readProjectItemFromDBByLocationName(parsedLocationString)
		setTimeout(function(){
			res.json(projectItems);
		}, 200);
	}
});

function parseRequestString(stringToParse) {
	projectItems = [];
	console.log(stringToParse)
	var fullyParsedRequest = "";
	var parsedRequestId = stringToParse.split("=")[1];
	var parsedArr = parsedRequestId.split("%20")
	for(var counter = 0; counter < parsedArr.length; counter++){
		// this parses REST API requests
		var splitArr = parsedArr[counter].split("+");
		for(var i =0; i < splitArr.length; i++){
			// handle single word requests
			if (splitArr.length === 1){
				fullyParsedRequest += splitArr[i];
				// Last word will not give an extra space
			} else if (i === splitArr.length - 1 && splitArr.length !== 1){
				fullyParsedRequest += splitArr[i];	
				// All other words should have a space
			} else {
				fullyParsedRequest += splitArr[i] + " ";
			}
		}
	}
	return fullyParsedRequest;
}

function readAllProjectItemsFromDB() {
	projectItems = [];
	var ref = firebase.database().ref("project");
	ref.on("child_added", function(snapshot) {
		var projectItemToAdd = new Project(snapshot.key, snapshot.val().id, snapshot.val().projectManager, snapshot.val().projectStartDate, snapshot.val().projectEndDate, snapshot.val().city);
		projectItems.push(projectItemToAdd);
	})
}

function readProjectItemFromDBByLocationName(metroName) {
	projectItems = [];
	var ref = firebase.database().ref("project").orderByChild('retailLocation').equalTo(metroName);
	ref.on("child_added", function(snapshot) {
		var projectItemReadFromDB = new Project(snapshot.key, snapshot.val().id, snapshot.val().projectManager, snapshot.val().projectStartDate, snapshot.val().projectEndDate, snapshot.val().retailLocation);
			console.log(projectItemReadFromDB);
			projectItems.push(projectItemReadFromDB);
	})
	
}

module.exports = router;