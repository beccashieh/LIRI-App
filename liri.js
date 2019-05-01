require("dotenv").config();

var argument = process.argv[2];

//Spotify Variables
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

//Search variable to be used in each API call
var search = process.argv[3];
// var spotifyDefault = "The Sign";

//Spotify API call
if (argument === "spotify-this-song") {
  spotify
    .search({ type: "track", query: search })
    .then(function(response) {
      console.log(
        `Preview URL: ${response.tracks.items[0].external_urls.spotify}`
      );
      console.log(`Artist: ${response.tracks.items[0].artists[0].name}`);
      console.log(`Song Title: ${response.tracks.items[0].name}`);
      console.log(`Album Name: ${response.tracks.items[0].album.name}`);
    })
    .catch(function(err) {
      console.log(err);
    });
  //***How to handle if no song entered?***/
  // if (search == null){
  //   spotify.search({ type: 'track', query: spotifyDefault});
  // };
}

//Bands in town API
if (argument === "concert-this"){
  axios
  .get(
    `https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp`
  )
  .then(function(response) {
    console.log(response.data);
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
  })
  .catch(function(err) {
    console.log(err);
  })
};

//OMDB API
if (argument === "movie-this"){
axios
  .get(
    `http://www.omdbapi.com/?t=${search}&apikey=eb603be6`
  )
  .then(function(response) {
    console.log(response.data.ratings);
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
  })
  .catch(function(err) {
    console.log(err);
  })
};
