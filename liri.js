require("dotenv").config();
var fs = require("fs");
var request = require('request');
var Twitter = require('twitter');
var keys = require("./keys.js");
var liriArgument = process.argv[2];

	// Possible commands for this liri app
	switch(liriArgument) {
		case "my-tweets": retrieveTweets(); break;
		case "spotify-this-song": spotifyThisSong(); break;
		case "movie-this": movieThis(); break;
		case "do-what-it-says": doThing(); break;
		// Instructions displayed in terminal to the user
		default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
			"1. my-tweets "+"\r\n"+
			"2. movie-this 'any movie name' "+"\r\n"+
			"3. do-what-it-says."+"\r\n"+
			"Be sure to put the movie or song name in quotation marks if it's more than one word.");
	};

// Functions
	// Movie function, uses the Request module to call the OMDB api
	function movieThis(){
    
        var movie = process.argv[3];
       
		if(!movie){
			movie = "mr nobody";
		}
		params = movie
		request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
             
               
				var movieResults ='------------------------\n' + 
                                    'Movie Information:\n' + 
                                    '------------------------\n\n' +
                                    'Movie Title: ' + data.Title + '\n' + 
                                    'Year Released: ' + data.Released + '\n' +
                                    'IMBD Rating: ' + data.imdbRating + '\n' +
                                    'Country Produced: ' + data.Country + '\n' +
                                    'Language: ' + data.Language + '\n' +
                                    'Plot: ' + data.Plot + '\n' +
                                    'Actors: ' + data.Actors + '\n' + 
                                    'Rotten Tomatoes Rating: ' + data.tomatoRating + '\n' +
                                    'Rotten Tomatoes URL: ' + data.tomatoURL + '\n';

				console.log(movieResults);
				
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
	};






function retrieveTweets() {

	
	// Initialize the Twitter client
	var client = new Twitter(keys.twitter);

	// Set the 'screen_name' to my Twitter handle
	var params = {screen_name: 'QuoteDaily', count: 20};

	// Retrieve the last 20 tweets
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
			var errorStr = 'ERROR: Retrieving user tweets -- ' + error;

		} else {
			// Pretty print user tweets
			var outputStr = 'User Tweets:\n' + 
							'------------------------\n\n';

			for (var i = 0; i < tweets.length; i++) {
				outputStr += 'Created on: ' + tweets[i].created_at + '\n' + 
							 'Tweet content: ' + tweets[i].text + '\n' +
                             '------------------------\n';
            
            }
            console.log(outputStr);
        }
    });
}
function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
      
      process.argv[3]=txt[1]
     
      movieThis();
    
    });
}
