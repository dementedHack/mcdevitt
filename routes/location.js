var express = require('express');
var router = express.Router();
var Location = require('../models/location');
var firebase = require("firebase");
var locationItems = [];
var parsedRequest = "";

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
		readAllLocationItemsFromDB();
		setTimeout(function(){
			res.json(locationItems);
		}, 200);
	} else {
		parsedRequest = parseRequestString(req.url);
		readLocationItemFromDBByCityName(parsedRequest);
		res.json(locationItems);
	}
});

function readLocationItemFromDBByCityName(metroName) {
	projectItems = [];
	var ref = firebase.database().ref("retailLocation").orderByChild('city'); //.equalTo("Santa Monica")
	ref.on("child_added", function(snapshot) {
		var projectItemReadFromDB = new Location(snapshot.key, snapshot.val().id, snapshot.val().footTraffic, snapshot.val().population, snapshot.val().address, snapshot.val().city);
			console.log(projectItemReadFromDB);
			projectItems.push(projectItemReadFromDB);
	})
	
}

function readAllLocationItemsFromDB() {
	locationItems = [];
	var ref = firebase.database().ref("retailLocation");
	ref.on("child_added", function(snapshot) {
		var locationItemToAdd = new Location(snapshot.key, snapshot.val().id, snapshot.val().footTraffic, snapshot.val().population, snapshot.val().address, snapshot.val().city);
		locationItems.push(locationItemToAdd);
	})
}

function parseRequestString(stringToParse) {
	locationItems = [];
	var fullyParsedRequest = "";
	var parsedRequestId = stringToParse.split("=")[1];
	console.log(parsedRequestId);
	var parsedArr = parsedRequestId.split("%20")
	for(var counter = 0; counter < parsedArr.length; counter++){
		//console.log(parsedArr[counter])
		var splitArr = parsedArr[counter].split("+");
		//console.log(splitArr)
		for(var i =0; i < splitArr.length; i++){
			if ( splitArr[i].toLowerCase() === "metropolitan" ){
				fullyParsedRequest += splitArr[i];
			} else if (i === splitArr.length - 1 && splitArr.length !== 1){
				fullyParsedRequest += splitArr[i];	
			} else {
				fullyParsedRequest += splitArr[i] + " ";
			}
		}
	}
	return fullyParsedRequest;
}

module.exports = router;