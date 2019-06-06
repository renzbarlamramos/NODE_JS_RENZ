// NODE MODULES
var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

// PARE ALL FORM DATA
app.use(bodyParser.urlencoded({extended: true}));

//FORMAT DATES
var dateFormat = require('dateformat');
var now = new Date();

// VIEW/TEMPLATE ENGINE (EJS)
app.set('view engine','ejs');

//IMPORTING JAVASCRIPT AND CSS (DIRECTORY)
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//MYSQL CONNECTION (DATABASE CONNECTION)
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'inventory'
});

//CONNECT TO SERVER (HTTP ADDRESS)
var server = app.listen(3000,function(){
    console.log("WEB SERVICE STARTING...");
});   

//ROUTE CONTROLLER
var indexRouter = require('./controllers/inventory');
app.use('/', indexRouter);


// MADE BY CHINY SANTOS 2019