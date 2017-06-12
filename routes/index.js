var express = require('express');
var router = express.Router();
// insert tedious driver 

var firebase = require("firebase");


var async = require('async');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var models = {};
var Invoice = require('../models/invoicedoc');

//Promise to avoid errors
var invoiceItems = [];

var stack = [];

// Create connection to database
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyBO1-jjR4Nai6fs_VrcfVwlUmBrPz7WPTE",
    authDomain: "mcdevitt-69fb0.firebaseapp.com",
    databaseURL: "https://mcdevitt-69fb0.firebaseio.com",
    storageBucket: "mcdevitt-69fb0.appspot.com"
  };
firebase.initializeApp(config);

var database = firebase.database();

function writeToDB() {
    firebase.database().ref('users/' + "1").set({
    username: "1",
    email: "l",
    profile_picture : "asdfasdfasdf"
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  invoiceItems = [];
  //queryDatabase();
  writeToDB();
  setTimeout(function(){
  	res.render('index', { title: 'Sample App', invoiceItems: invoiceItems });  
  }, 200);
  
});

router.post('/', function(req, res, next){

	var invoiceName = req.body.invoiceName;
	var invoiceCompany = req.body.invoiceCompany;

	var newInvoice = new Invoice;
	newInvoice.name = invoiceName;
	newInvoice.company = invoiceCompany;

	newInvoice.save(function(err){
		if(err){
			console.log(err);
		}
		console.log("Item saved to DB");
		console.log(invoiceName);
		console.log(invoiceCompany);

		scanForInvoices();
	})
});

function scanForInvoices() {
	Invoice.find(function (err, invoices) {
	  if (err) return console.error(err);
	  invoiceItems = (invoices);
	})
}

module.exports = router;

function queryDatabase(){
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
    	// Query only returns a few fields
        "SELECT TOP 10 FirstName, LastName, CompanyName FROM SalesLT.Customer",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
        }
    );

    request.on('row', function(columns) {
        var item = {};
        columns.forEach(function(column) {
            //console.log("%s\t%s", column.metadata.colName, column.value);
            item[column.metadata.colName] = column.value; 
        });
            console.log(item);
            invoiceItems.push(item);
            console.log("------------------");
    });
    connection.execSql(request);
}