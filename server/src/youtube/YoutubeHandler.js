// ================= Modules ========================
var { google } = require("googleapis");
var fs = require('fs');
var youtube;

// ============== Global Variables ==================
var keyLoc = "src/.config/api_key";
var API_KEY;

// ================= Methods ========================

/*
 * Read API Key from config files 
 */
fs.readFile(keyLoc, function (err, content) {
    console.log('Reading config files...');
    if(err) {
      console.log('Error loading config file: ' + err);
      return;
    }else {
        console.log('Read successful, API KEY acquired')
        API_KEY = content;
    }
});

/**
 * Setup youtube object
 */
function getYoutube() {
    if(youtube == null) {
        youtube = google.youtube("v3");
    }
    return youtube;
}

/**
 * Search youtube videos using given string
 * 
 * @param {*} searchString 
 */
async function searchYoutubeVideo(searchString) {
    let youtube = getYoutube();
    console.log('Searching video....');

    let promise = new Promise((resolve, reject) => {
        youtube.search.list(
            {
                part: 'id,snippet', 
                q: searchString, 
                maxResults: 25,
                key: API_KEY,
                type: 'video'
            }, null, 
            function(err, res) {
                if(err == null) {
                    console.log('Response received')
                    resolve(res);
                }else {
                    reject(err);
                }
            }
        );
    });

    let response = await promise;
    console.log('Response handled');
    return response;
}

/**
 * Display video list 
 * 
 * @param {*} videoId 
 */
const playListItems = async (videoId) => {
    let youtube = getYoutube();
    
    const response = await youtube.videos.list({
            part: "id,snippet",
            id: videoId,
            key: API_KEY
    }).then(res=> {
        console.log(res)
        return res
    }).catch(err)
    
}

exports.searchYoutubeVideo = searchYoutubeVideo;
exports.playListItems = playListItems;