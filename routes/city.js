var express = require('express');
var router = express.Router();
var City = require('../models/city');
var firebase = require("firebase");
var cityItems = [];

// var config = {
//     apiKey: "AIzaSyBO1-jjR4Nai6fs_VrcfVwlUmBrPz7WPTE",
//     authDomain: "mcdevitt-69fb0.firebaseapp.com",
//     databaseURL: "https://mcdevitt-69fb0.firebaseio.com",
//     storageBucket: "mcdevitt-69fb0.appspot.com"
//   };
// firebase.initializeApp(config);

var database = firebase.database();

router.get('/', function(req, res, next){
	// Parse request parameters sent
	var fullyParsedRequest = "";
	var parsedRequestId = req.url.split("=")[1];
	var parsedArr = parsedRequestId.split("%20")
	
	for(var i = 0; i < parsedArr.length; i++) {
		if (i == parsedArr.length - 1) {
			fullyParsedRequest += parsedArr[i]
		} else {
			fullyParsedRequest += parsedArr[i] + " "
		}
	}
	console.log(fullyParsedRequest)
	// Send parsed parameter as an input to query DB
	readCityItemFromDBByMetroName(fullyParsedRequest);
	setTimeout(function(){
		res.json(cityItems);
	}, 200);
});

function readCityItemFromDBByMetroName(metroName) {
	console.log(metroName);
	cityItems = [];
	var ref = firebase.database().ref("city").orderByChild('metropolitan').equalTo(metroName);
	ref.on("child_added", function(snapshot) {
		var citiesList;
		var cityItemReadFromDB = new City(snapshot.key, snapshot.val().id, snapshot.val().population, snapshot.val().surfaceArea, snapshot.val().retailLocations, snapshot.val().metropolitan);
			console.log(cityItemReadFromDB);
			cityItems.push(cityItemReadFromDB);
	})
	
}

module.exports = router;