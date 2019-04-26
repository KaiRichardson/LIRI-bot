require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:

// concert-this
if (process.argv[2] === "concert-this") {
    var artist = process.argv[3];
    var concertDate = 0;

    // If the user doesn't type a artist in, the program will prompt user for a name'
    if (artist === undefined) {
        console.log("Please input a band name.");
        return;
    };

    // This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log(response.data);
            console.log("Next Shows for " + artist + " Are:");
            console.log("");
            for (let i = 0; i < response.data.length; i++) {
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                concertDate = moment(response.data[i].datetime).format('LLL');
                console.log("Concert Date: " + concertDate);
                console.log("");

            };
        });
};

// spotify-this-song
if (process.argv[2] === "spotify-this-song") {

    var artist = [];

    var song = process.argv[3];
    // var concertDate = 0;

    // If the user doesn't type a artist in, the program will prompt user for a name'
    if (song === undefined) {
        song = "The Sign";
    };

    // This will show the following information about the song in your terminal/bash window
    spotify
        .search({ type: 'track', query: song, limit: "5" })
        .then(function (response) {
            // console.log(response.tracks.items[0].artists[0].name);
            for (let i = 0; i < response.tracks.items.length; i++) {
                artist = [];
                console.log(i + 1);
                for (let j = 0; j < response.tracks.items[i].artists.length; j++) {
                    artist.push(" " + response.tracks.items[i].artists[j].name);
                }
                console.log("Artist(s): " + artist);
                console.log("Song Name: " + response.tracks.items[i].name);
                console.log("Preview Link: " + response.tracks.items[i].preview_url);
                console.log("Album Name: " + response.tracks.items[i].album.name);
                console.log("");
            }
        })
        .catch(function (err) {
            console.log('Error occurred: ' + err);
        });
};

////// Artist(s)
////// The song's name
////// A preview link of the song from Spotify
////// The album that the song is from
////// If no song is provided then your program will default to "The Sign" by Ace of Base.

//// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

if (process.argv[2] === "movie-this") {

    // movie-this
    var movieName = process.argv[3];

    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (movieName === undefined) {
        movieName = "Mr. Nobody";
    };
    // This will output the following information to your terminal/bash window:
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            // console.log(response.data);
            console.log("Movie Title: " + response.data.Title);
            console.log("Movie Released: " + response.data.Released);
            console.log("Movie IMDB Ratings: " + response.data.Ratings[0].Value);
            console.log("Movie Rotten Tomatoes Ratings: " + response.data.Ratings[1].Value);
            console.log("Movie Country: " + response.data.Country);
            console.log("Movie Language: " + response.data.Language);
            console.log("Movie Plot: " + response.data.Plot);
            console.log("Movie Actors: " + response.data.Actors);
        });
};

// do-what-it-says
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
        // Edit the text in random.txt to test out the feature for movie-this and concert-this.

// BONUS
    // In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
    // Make sure you append each command you run to the log.txt file.
    // Do not overwrite your file each time you run a command.