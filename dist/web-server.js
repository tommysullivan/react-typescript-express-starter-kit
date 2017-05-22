"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var expressApp = express();
var portNumber = 5000;
var hostName = 'localhost';
var myUrl = "http://" + hostName + ":" + portNumber;
expressApp.set('port', portNumber);
expressApp.use(express.static('lib/public'));
expressApp.use(express.static('dist/public'));
// expressApp.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
// expressApp.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
// expressApp.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
http.createServer(expressApp).listen(portNumber, hostName, function (error) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    else
        console.log("web server is running at " + myUrl);
});
expressApp.get('/hello', function (httpRequest, httpResponse) {
    httpResponse.end("hello");
});
