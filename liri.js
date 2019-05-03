require("dotenv").config();

var argument = process.argv[2];

//Spotify Variables
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//Search variable to be used in each API call
var search = process.argv[3];

var movieURL = `http://www.omdbapi.com/?t=${search}&apikey=eb603be6`

// When no song title provided, defaults to specific song, The Sign.
function lookupSpecificSong() {

	// Calls Spotify API to retrieve a specific track, The Sign, Ace of Base.
	spotify.search({type: 'track', id: '3DYVWvPh3kGwPasp7yjahc'}, function(err, response) {
		if (err) {
			logOutput.error(err);
			return
		}

		// Prints the artist, track name, preview url, and album name.
    console.log(
      `Preview URL: ${response.tracks.items[0].external_urls.spotify}`
    );
    console.log(`Artist: ${response.tracks.items[0].artists[0].name}`);
    console.log(`Song Title: ${response.tracks.items[0].name}`);
    console.log(`Album Name: ${response.tracks.items[0].album.name}`);
	});
}
//Spotify API call

function music() {
  if (search === ""){
    lookupSpecificSong();
  } else {
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
  fs.appendFile("log.txt", `You entered "${argument} ${search}"\n`, function(
    err
  ) {
    if (err) throw err;
  });
}
}

//***How to handle if no song entered?***/
// if (search == null){
//   spotify.search({ type: 'track', query: spotifyDefault});
// };


//Bands in town API
function bands() {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp`
    )
    .then(function(response) {
      var date = response.data[1].datetime;
      moment(date).format("MM/DD/YYYY");
      console.log(JSON.stringify(response.data, null, 2));
      // console.log(`Artist: ${response.data[1].lineup}`);
      // console.log(`Venue Name: ${response.data[1].venue.name}`);
      // console.log(`Location: ${response.data[1].venue.city}, ${response.data[1].venue.country}`);
      // console.log(`Date: ${date}`);
    })
    .catch(function(err) {
      console.log(err);
    });
  fs.appendFile("log.txt", `You entered "${argument} ${search}"\n`, function(
    err
  ) {
    if (err) throw err;
  });
}

//OMDB API
function omdb() {
  if (search === ""){
  axios
    .get(`http://www.omdbapi.com/?t=Mr+Nobody&apikey=eb603be6`)
    .then(function(response) {
      console.log(JSON.stringify(response.data, null, 2));
      // console.log(`Movie Title: ${response.Title}`);
      // console.log(`Release Year: ${response.data.Year}`);
      // console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
      // console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
      // console.log(`Production Country: ${response.data.Country}`);
      // console.log(`Movie Language: ${response.data.Language}`);
      // console.log(`Movie Plot: ${response.data.Plot}`);
      // console.log(`Actors: ${response.data.Actors}`);
    })
    .catch(function(err) {
      console.log(err);
    });
//   } else {
//     axios
//     .get(movieURL)
//     .then(function(response) {
//       // console.log(JSON.stringify(response.data, null, 2));
//       console.log(`Movie Title: ${response.data.Title}`);
//       console.log(`Release Year: ${response.data.Year}`);
//       console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
//       console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
//       console.log(`Production Country: ${response.data.Country}`);
//       console.log(`Movie Language: ${response.data.Language}`);
//       console.log(`Movie Plot: ${response.data.Plot}`);
//       console.log(`Actors: ${response.data.Actors}`);
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
//   fs.appendFile("log.txt", `You entered "${argument} ${search}"\n`, function(
//     err
//   ) {
//     if (err) throw err;
//   });
// }
  }
  

//do-what-it-says command
// Uses fs node package to take the text inside random.txt,
// and do something with it.
function doWhatItSays() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

			// Creates array with data.
			var randomArray = data.split(",");

			// Sets action to first item in array.
			argument = randomArray[0];

			// Sets optional third argument to second item in array.
			search = randomArray[1];

			// Calls main controller to do something based on action and argument.
			music();
		}
	});
}
    fs.appendFile("log.txt", `You entered "${argument} ${search}"\n`, function(
      err
    ) {
      if (err) throw err;
    });


//Command arguments
if (argument === "movie-this") {
  omdb();
};
if (argument === "concert-this") {
  bands();
};
if (argument === "spotify-this-song") {
  music();
};
if (argument === "do-what-it-says") {
  doWhatItSays();
};
}
