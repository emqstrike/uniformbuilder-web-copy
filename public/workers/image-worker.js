onmessage = function(e) {
    var data = e.data;
    postMessage(data);
};

function decodeBase64Image(dataString) {
    return dataString;
}