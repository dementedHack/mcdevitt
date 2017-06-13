var express = require('express');
var router = express.Router();
var Location = require('../models/location');
var firebase = require("firebase");
var locationItems = [];

// var config = {
//     apiKey: "AIzaSyBO1-jjR4Nai6fs_VrcfVwlUmBrPz7WPTE",
//     authDomain: "mcdevitt-69fb0.firebaseapp.com",
//     databaseURL: "https://mcdevitt-69fb0.firebaseio.com",
//     storageBucket: "mcdevitt-69fb0.appspot.com"
//   };
// firebase.initializeApp(config);

var database = firebase.database();

router.get('/', function(req, res, next){
	locationItems = [];
	readCityItemFromDB();
	setTimeout(function(){
		res.json(locationItems);
	}, 200);
	
});

function readCityItemFromDB() {
	locationItems = [];
	var ref = firebase.database().ref("retailLocation");
	ref.on("child_added", function(snapshot) {
		locationItems.push(snapshot.val())
	})
}

module.exports = router;