var express = require('express');
var router = express.Router();
var City = require('../models/city');
var firebase = require("firebase");
var cityItems = [];

var database = firebase.database();

router.get('/', function(req, res, next){
	// If there are no parameters in the request, send back all items
	if (req.url === '/') {
		readAllCityItems();
		setTimeout(function(){
			res.json(cityItems);
		}, 200);
	} else {
	// Parse request parameters sent from both REST and jQuery params
	// Suggest coming back to rename variables
	var fullyParsedRequest = "";
	var parsedRequestId = req.url.split("=")[1];
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

	// Send parsed parameter as an input to query DB


	readCityItemFromDBByMetroName(fullyParsedRequest);

		// API will send data as a JSON response
		setTimeout(function(){
			res.json(cityItems);
		}, 200);
	}
});

function readCityItemFromDBByMetroName(metroName) {
	cityItems = [];
	var ref = firebase.database().ref("city").orderByChild('metropolitan').equalTo(metroName);
	ref.on("child_added", function(snapshot) {
		var citiesList;
		var cityItemReadFromDB = new City(snapshot.key, snapshot.val().id, snapshot.val().population, snapshot.val().surfaceArea, snapshot.val().retailLocations, snapshot.val().metropolitan);
			console.log(cityItemReadFromDB);
			cityItems.push(cityItemReadFromDB);
	})
	
}

function readAllCityItems(){
	cityItems = [];
	var ref = firebase.database().ref("city").orderByChild('id');
	ref.on("child_added", function(snapshot) {
		var citiesList;
		var cityItemReadFromDB = new City(snapshot.key, snapshot.val().id, snapshot.val().population, snapshot.val().surfaceArea, snapshot.val().retailLocations, snapshot.val().metropolitan);
			console.log(cityItemReadFromDB);
			cityItems.push(cityItemReadFromDB);
	})
}

module.exports = router;