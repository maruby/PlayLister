var express = require('express');
var router = express.Router();
var YoutubeHandler = require('../youtube/YoutubeHandler');

/* GET home page. */
router.get('/searchVideo', function(req, res, next) {
    var query = (req.params.query == null) ? req.query.query : req.params.query;
    console.log('Invoked /searchVideo | query = ' + query);
    var resultPromise = YoutubeHandler.searchYoutubeVideo(query);

    resultPromise.then(function successHandler(result) {
        responseHandler(result, res);
    },function errorHandler(result) {
        responseHandler(result, res); 
    });
});

router.get(`/playList/:videoId`, (req, res) => {
    const {videoId} = req.params
    console.log('Invoked /playList | videoId = ' + videoId);
    var resultPromise = YoutubeHandler.playListItems(videoId);

    resultPromise.then(function successHandler(result) {
        responseHandler(result, res);
    },function errorHandler(result) {
        responseHandler(result, res); 
    });
}) 

function responseHandler(result, res) {
    let success = result.status == 200;

    if(success){
        res.send({
                "success": success, 
                "response": result
            });
    } else {
        res.send({
            "error": error,
        })
    }

    
}


module.exports = router;