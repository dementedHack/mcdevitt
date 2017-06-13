var express = require('express');
var router = express.Router();
var Metropolitan = require('../models/metropolitan');
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
	readCityItemFromDB();
	setTimeout(function(){
		res.json(cityItems);
	}, 200);
	
});

function readCityItemFromDB() {
	cityItems = [];
	var ref = firebase.database().ref("city");
	ref.on("child_added", function(snapshot) {
		cityItems.push(snapshot.val())
	})
}

module.exports = router;