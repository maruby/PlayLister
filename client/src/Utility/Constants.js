const domParser = new DOMParser();

exports.parseDOMToString = (input) => {
    var doc = domParser.parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

exports.Common = {
    GOOGLE_SUGGEST: "//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=",
    YOUTUBE: "https://www.youtube.com/watch?v="
}

exports.PlaylistConstants = {
    NEXT: 0,
    PREVIOUS: 1
}

exports.LoopConstants = {
    REPEAT_ALL: 0,
    REPEAT_ONE: 1,
    SHUFFLE: 2,
    REPEAT_ALL_TOOLTIP: "Repeat All",
    REPEAT_ONE_TOOLTIP: "Repeat One",
    SHUFFLE_TOOLTIP: "Shuffle",
    DEFAULT: "loop_tooltip"
}

/**
 * Pad the string with 0. If parameter has more than 1 characters, the pad will be removed
 * (e.g. If parameter is 1, returns 01; If parameter is 12, returns 12)
 * 
 * @param {*} string
 * @reference https://github.com/CookPete/react-player/blob/master/src/demo/Duration.js 
 */
const pad = (string) => {
    return ('0' + string).slice(-2)
}

/**
 * Format seconds to hh:mm:ss format if seconds is more than 3600 (60 Minutes)
 * 
 * @param {*} seconds
 * @reference https://github.com/CookPete/react-player/blob/master/src/demo/Duration.js 
 */
exports.formatDuration = (seconds) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    return hh ? `${hh}:${pad(mm)}:${ss}` : `${mm}:${ss}`;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * 
 * @param {*} min Minimum value of the random number
 * @param {*} max Maximum value of the random number
 * @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
exports.getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}