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
http.createServer(expressApp).listen(portNumber, hostName, function (error) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    else
        console.log("web server is running at " + myUrl);
});
