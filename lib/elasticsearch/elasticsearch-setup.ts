import { createIndexAndStuff } from "./elasticsearch";

const fs = require('fs');
const path = require('path');
const https = require('https');
const extract = require('extract-zip');
const slash = '\\'; // because i think windows is the only one that uses this backslash?
const destinationDirectory = __dirname + slash;
const elasticsearchLink = "https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.4.3.zip";
const elasticsearchYmlAddition = 'http.cors.enabled: true \nhttp.cors.allow-origin: "*"';

setupElasticSearch(elasticsearchLink, destinationDirectory);

// If necessary, creates downloads folder to put elasticsearch and unzips it.
// Then starts server and configures database if necessary (not written yet)
async function setupElasticSearch(downloadLink:string, unzipDestination:string) {
    const downloadFileName = downloadLink.substr((downloadLink.lastIndexOf('/') + 1));
    const downloadFileNameWithoutExtension = downloadFileName.substr(0, downloadFileName.lastIndexOf('.'));

    try { //change to if later
        fs.statSync(destinationDirectory + downloadFileNameWithoutExtension);
        console.log(`${unzipDestination + downloadFileNameWithoutExtension} already exists.`)
    }
    catch(e) {
        await promiseDownloadFile(elasticsearchLink, destinationDirectory)
        await unzipFile(destinationDirectory + downloadFileName, destinationDirectory);
        await deleteFile(destinationDirectory + downloadFileName);
    }

    // modify elasticsearch.yml to allow connections
    const ymlFileLocation = destinationDirectory + downloadFileNameWithoutExtension + slash + 'config' + slash + 'elasticsearch.yml';
    console.log(ymlFileLocation);
    if(fs.readFileSync(ymlFileLocation).indexOf(elasticsearchYmlAddition) >= 0) {
        console.log("elasticsearch.yml is properly configured i guess.");
    }
    else {
        fs.appendFileSync(ymlFileLocation, elasticsearchYmlAddition);
    }

    createIndexAndStuff();
}

function promiseDownloadFile(downloadLink:string, dest:string) {
    return new Promise((resolve, reject) => {
        const fileName = downloadLink.substr(downloadLink.lastIndexOf('/') + 1);
        if (!fs.existsSync(dest + fileName)) {
            const file = fs.createWriteStream(dest + fileName);
            const request = https.get(downloadLink, function(response:any) {
                response.pipe(file).on('finish', () => resolve());
            });
        }
        else {
            console.log(`The downloaded file ${dest + fileName} already exists.`);
            resolve();
        }
    });
}

function unzipFile(source:string, target:string) {
    return new Promise((resolve, reject) => {
        const sourceWithoutExtension = source.substr(0, source.lastIndexOf('.'));
        const unzippedFolderName = sourceWithoutExtension.substr(sourceWithoutExtension.lastIndexOf(slash) + 1);
        try {
            fs.statSync(target + slash + unzippedFolderName);
            console.log(`The unzipped file ${target + slash + unzippedFolderName} already exists.`);
        }
        catch(e) {
            extract(source, {dir: target}, function (err:any) {
                console.log(err);
                resolve();
            });
        }
    });
}

function deleteFile(source:string)
{
    return new Promise((resolve, reject) => {
        if (fs.existsSync(source)) {
            fs.unlink(source, () => resolve());
            console.log(`deleted ${source}`);
        }
    });
}

