const domParser = new DOMParser();

exports.parseDOMToString = (input) => {
    var doc = domParser.parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

exports.Common = {
    GOOGLE_SUGGEST: "//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q="
}