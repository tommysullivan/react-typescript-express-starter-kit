import * as express from "express";
import * as http from "http";

const expressApp = express();
const portNumber = 5000;
const hostName = 'localhost';
const myUrl = `http://${hostName}:${portNumber}`;

expressApp.set('port', portNumber);
expressApp.use(express.static('lib/public'));
expressApp.use(express.static('dist/public'));
// expressApp.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
// expressApp.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
// expressApp.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
http.createServer(expressApp).listen(
                portNumber,
                hostName,
                (error:any) => {
                    if(error) {
                        console.log(error);
                        process.exit(1);
                    }
                    else console.log(`web server is running at ${myUrl}`);
                });

expressApp.get('/hello', (httpRequest, httpResponse) => {
    httpResponse.end("hello");
});