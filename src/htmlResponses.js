"use strict";
 // pull in the file system module
const fs = require('fs');

//for image
const path = require('path');
const staticBasePath = './hosted';

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const moduleJS = fs.readFileSync(`${__dirname}/../src/makeModule.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getModule = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/javascript'
  });
  response.write(moduleJS);
  response.end();
};

const getImage = (request, response) => {
  //code tweaked but mostly from https://stackabuse.com/node-http-servers-for-static-file-serving/
  let basePath = path.resolve(staticBasePath);
  let normalizedPath = path.normalize(request.url);
  let reaplacedPath = normalizedPath.replace(/^(\.\.[\/\\])+/, '');

  let finalFileLocation = path.join(basePath, reaplacedPath);

  //ok now we do a stream
  let stream = fs.createReadStream(finalFileLocation);

  stream.on('error', function(err){
    response.writeHead(404, "Not found");
    response.write("Not found");
    response.end();
  });

  response.writeHead(200);
  stream.pipe(response);
}

module.exports = {
  getIndex,
  getCSS,
  getImage,
  getModule
};