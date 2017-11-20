var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/quiz2";
var db;

MongoClient.connect(url, function (err, database) {
    if (err) throw err;
    db = database;
    console.log("Connected to " + url);
});

function insert(req, res) {
    var newUser = {
        ID : req.body.dd,
        first_name : req.body.Fname,
        last_name : req.body.Lname,
        expired : req.body.exp,
        role : req.body.role
    };
    db.collection("users").insertOne(newUser, function (err, res) {
        if (err) throw err;
        console.log("user inserted");
    });
    res.redirect('/');
}

function findAll(req, res) {
    var query = {};
    db.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
};

function findByFname(req, res) {
    var query = {
        first_name : req.query.first_name
    };
    console.log(query);
    db.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
};

function findByRole(req, res) {
    var query = {
        role: req.params.role
    };
    console.log(query);
    db.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
};

module.exports = {
    findAll: findAll,
    findByFname: findByFname,
    insert: insert,
    findByRole: findByRole
};