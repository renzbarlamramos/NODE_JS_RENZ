var express = require('express');
var app = express.Router();

var mysql = require('mysql');
const siteTitle = "Questrionix Exam";
const baseUrl = "http://localhost:3000/";

//MYSQL CONNECTION
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'inventory'
});


//REST API'S 
//GET and POST METHODS
app.get('/',function(req,res){
    connection.query("SELECT * FROM items", function(err,result){
        res.render('pages/index',{
            siteTitle : "CS",
            pageTitle : "INVENTORY SYSTEM EXPRESS FRAMEWORK",
            items : result
        });
    });
});

app.get('/inventory/add',function(req,res){
    res.render('pages/add.ejs',{
        siteTitle : siteTitle,
        pageTitle : "Add New Item",
        items : ''
    });
});

app.post('/inventory/add',function(req,res){
    
    var sql = "INSERT INTO items (NAME,QTY,AMOUNT) VALUES ?";
    var values = [
      [req.body.NAME, req.body.QTY,req.body.AMOUNT]
    ];

    connection.query(sql, [values], function (err, result) {
      if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        console.log(result + "RESULT");
        console.log(err);
      res.redirect(baseUrl);
    });

});

app.post('/inventory/add',function(req,res){
    
    var sql = "INSERT INTO items (NAME,QTY,AMOUNT) VALUES ?";
    var values = [
      [req.body.NAME, req.body.QTY,req.body.AMOUNT]
    ];

    connection.query(sql, [values], function (err, result) {
      if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        console.log(result + "RESULT");
        console.log(err);
      res.redirect(baseUrl);
    });

});


app.get('/inventory/delete/:id',function(req,res){
    connection.query("DELETE FROM items WHERE ID ='"+ req.params.id +"'", function (err, result) {
        if(result.affectedRows){
            res.redirect(baseUrl);
        }
    });
});

app.get('/inventory/edit/:id',function(req,res){
    connection.query("SELECT * FROM items WHERE ID ='"+ req.params.id +"'", function (err, result) {
        res.render('pages/edit',{
            siteTitle : siteTitle,
            pageTitle : "Edit Record - " + result[0].NAME,
            items : result
        })
    });
});

app.post('/inventory/edit/:id',function(req,res){
    var sql = "UPDATE items SET NAME='"+req.body.NAME+"',QTY='"+req.body.QTY+"',AMOUNT='"+req.body.AMOUNT+"' WHERE ID = '"+req.params.id+"'";

    connection.query(sql, function (err, result) {
      if (err) throw err;
        console.log("Number of records updated: " + result.affectedRows);

      res.redirect(baseUrl);
    });

});

module.exports = app;