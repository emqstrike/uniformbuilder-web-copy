/**
 * JSON Loader Web Worker
 * json-loader-worker.js
 */

onmessage = function(e) {
    console.log('Inside Web Worker');
    console.log(e.data);
    get(e.data.url, function(response) {
        if (response.success) {
            postMessage({
                response: response
            });
        }
    });
};

function get(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
        var status;
        var data;
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
}