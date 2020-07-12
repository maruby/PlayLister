var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/searchMusic', function(req, res, next) {
    res.send('You are gay');
});

module.exports = router;
const Chuchu = () => {
    router.get('/searchMusic2', function(req, res, next) {
        res.send('You are gay 2');
    });
}

module.export = {
    Chuchu();
}