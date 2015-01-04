var express = require('express');
var cors = require('cors');
var http = require('http');
var movieService = require('./src/js/movieService.js');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.set('port', (process.env.PORT || 8000));

app.options('*', cors());
app.use(cors());

// all requests for movie data is routed through the nodejs application.
app.get('/movies*', function(request, response, next) {
    var url = 'mongodb://localhost/movies';
    MongoClient.connect(url, function(err, db) {

        db.collection('movies').find({}).toArray(function(err, movies) {
            console.log("Data fetched...", movies[0].name);
            //response.send(movies);
            db.close();
        });

        var movies = {
            'movies': [{
                'name': 'abc1',
                'rating': 1,
                'director': 'Mayur'
            }, {
                'name': 'abc2',
                'rating': 1,
                'director': 'Arunan'
            }]
        };

        console.log("movies", JSON.stringify(movies));
        response.send(movies);
    });
});

// all requests for movie data is routed through the nodejs application.
app.get('/dbsetup', function(request, response, next) {
    var url = 'mongodb://localhost/movies';
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");

        insertDocuments(db, function() {
            response.send("Movies added to DB");
            db.close();
        });
    });

    var insertDocuments = function(db, callback) {
        var collection = db.collection('movies');
        collection.insert([{
            "name": "abc1",
            "rating": 1,
            "director": "Mayur"
        }, {
            "name": "abc2",
            "rating": 1,
            "director": "Arunan"
        }, {
            "name": "abc3",
            "rating": 1,
            "director": "Arunan"
        }, {
            "name": "abc4",
            "rating": 1,
            "director": "Arunan"
        }, {
            "name": "abc5",
            "rating": 1,
            "director": "Arunan"
        }], function(err, result) {
            console.log("Inserted movies into the document collection");
            callback(result);
        });
    }
});

app.use(express.static(__dirname + '/src'));
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
