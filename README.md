# LIRI-App

LIRI is a language recognition app that operates from the command line. It takes in a command and an optional search parameter to return data utilizing the spotify, bands in town, and OMBD apis. 

![liri_demogif](https://user-images.githubusercontent.com/47259793/57163119-41ffae80-6dbe-11e9-97a0-b3cc0f0c8d0d.gif)

## Getting Started

From the command line, type node liri.js followed by one of the following commands:
* _**spotify-this-song**_
* _**concert-this**_
* _**movie-this**_
* _**do-what-it-says**_

* After the spotify command, type the name of a song using " ", and the app will return data on the selected song. 
* After the concert command, type the name of an artist using " ", and the app will return data on concert dates for that artist.
* After the movie command, type the name of a movie using " ", and the app will return data on that movie.
* The last command above uses fs to read text entered on the random.txt file and will return spotify data for "I Want it That Way".
* Entries are recorded on the log.txt file.

![recording](https://user-images.githubusercontent.com/47259793/57162211-8e95ba80-6dbb-11e9-8765-2deac2561714.PNG)

## Prerequisites

If you would like to run this program on your own machine, you will need to supply your own .env file containing your spotify ID and secret key. 


## Authors

**Rebecca Shieh** 
