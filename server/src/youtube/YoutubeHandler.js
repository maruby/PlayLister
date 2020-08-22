// ================= Modules ========================
var { google } = require("googleapis");
var fs = require('fs');
var youtube;

// ============== Global Variables ==================
var keyLoc = "./config/API_KEY";
var API_KEY;

// ================= Methods ========================

/**
 * Get the config file from keyLoc
 */
function getApiKey() {
    if(API_KEY) {
        return;
    }
    
    console.log('Reading config file...');
    fs.readFile(keyLoc, function (err, content) {
        if(err) {
            console.log('Error loading config file: ' + err);
            return;
        }else {
            console.log('Read successful, API KEY acquired')
            API_KEY = content;
        }
    });
}

/**
 * Setup youtube object
 */
function getYoutube() {
    if(API_KEY == null) {
        getApiKey();
    }

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
const getYoutubeVideo = async (videoId) => {
    let youtube = getYoutube();
    
    const response = new Promise((resolve, reject) => {
        youtube.videos.list({
            part: "id,snippet",
            id: videoId,
            key: API_KEY
        }).then(res => resolve(res))
        .catch(err => reject(err))
        .catch(err => console.error(err))
    })
    
    const result = await response
    return result
}

exports.searchYoutubeVideo = searchYoutubeVideo;
exports.getYoutubeVideo = getYoutubeVideo;