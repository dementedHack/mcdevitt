var express = require('express');
var router = express.Router();
var Metropolitan = require('../models/metropolitan');
var firebase = require("firebase");
var metroItems = [];

// var config = {
//     apiKey: "AIzaSyBO1-jjR4Nai6fs_VrcfVwlUmBrPz7WPTE",
//     authDomain: "mcdevitt-69fb0.firebaseapp.com",
//     databaseURL: "https://mcdevitt-69fb0.firebaseio.com",
//     storageBucket: "mcdevitt-69fb0.appspot.com"
//   };
// firebase.initializeApp(config);

var database = firebase.database();

/* GET invoice listing. Will respoond with JSON */
router.get('/', function(req, res, next){
	metroItems = [];
	readAllMetroItemsFromDB();
	setTimeout(function(){
		res.json(metroItems);
	}, 200);
	
});


// Function that scans the db for all items and then pushes the items into an array
function readAllMetroItemsFromDB(){
	var ref = firebase.database().ref("metropolitanArea");
	ref.on("child_added", function(snapshot) {
		var citiesArr = []
		// Iterate through the cities array from the db
		for(var i =0; i < snapshot.val().cities.length; i++) {
			citiesArr.push(snapshot.val().cities[i])
		}
		// Instantiate object with values
		var metroItemToInsertIntoDB = new Metropolitan(snapshot.key, snapshot.val().id, citiesArr, snapshot.val().population);
		console.log(metroItemToInsertIntoDB);
		metroItems.push(metroItemToInsertIntoDB);
	});
}


module.exports = router;
