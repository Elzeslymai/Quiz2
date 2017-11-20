const hbs = require('hbs');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();
var user = require('./user.js');
var url = "mongodb://localhost:27017/quiz2";

app.listen(3000, () => console.log('Server is running at http://localhost:3000'));

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");


    db.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
});

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.render('index.hbs');
});

app.get('/users/searchname', function (req, res) {
    res.render('searchname.hbs');
});

app.get('/users/searchrole', function (req, res) {
    res.render('searchrole.hbs');
});

app.post('/insertuser', user.insert);
app.get('/users', user.findAll);
app.get('/users/search', user.findByFname);
app.get('/user/role/:role', user.findByRole);



