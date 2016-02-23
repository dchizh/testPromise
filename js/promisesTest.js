/**
 * Created by dchyzhyk on 23.02.2016.
 */

    'use strict';

var URLs = [
    '/templates/catalog.html',
    '/templates/info.html',
    '/templates/main.html',
    '/index.html'
];


function getURL(url){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function() {
            resolve(url + " Loaded " + this.response.length + " bytes");
        };
        request.onerror = function() {
            reject(url + "Loaded with error");
        };
        request.send();
    });
}

// асинхронно
Promise.all( URLs.map(getURL) )
    .then(
        results => {console.log(results)}
    );
// последовательно
var allRequests = Promise.resolve();
var results = [];
URLs.forEach(function(url) {
    allRequests = allRequests
        .then(() => getURL(url))
        .then((result) => {
            results.push(result);
        });
    });

allRequests.then(() => {
    console.log(results);
});


