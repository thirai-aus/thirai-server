var express = require('express');
var cors = require('cors');
var http = require('http');
var movieService = require('./src/js/movieService.js');

var app = express();

app.set('port', (process.env.PORT || 8000));

app.options('*', cors());
app.use(cors());

// all requests for movie data is routed through the nodejs application.
app.get('/movies*', function(request, response, next) {
    var movies = JSON.stringify({
        "movies": [{
            "name": "abc1"
        }, {
            "name": "abc2"
        }, {
            "name": "abc3"
        }, {
            "name": "abc4"
        }, {
            "name": "abc5"
        }]
    });

    var movieDetails = JSON.stringify({
        "movies": [{
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
        }]
    });
    if (request.url.toLowerCase().indexOf("movies/details") <= 0) {
        response.send(movies);
    } else {
        response.send(movieDetails);
    }
});

app.use(express.static(__dirname + '/src'));
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
