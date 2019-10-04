
const http = require('http');
const url = require('url');
const query = require('querystring');

const fs = require('fs');
const path = require('path');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// pull in the file system module

// for image

const staticBasePath = './hosted';

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/src/makeModule.js': htmlHandler.getModule,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    notFound: jsonHandler.notFound,
    '/getUsers': jsonHandler.getUsers,
    '/addUsers': jsonHandler.addUsers,
    '/notReal': jsonHandler.notReal,
  },
  HEAD: {
    // these should all be meta ones! bc no message :)
    '/getUsers': jsonHandler.getUsersMeta,
    '/notReal': jsonHandler.notRealMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

const handlePost = (request, response) => {
  const res = response;
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    res.statusCode = 400;
    res.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    jsonHandler.addUserClosets(request, res, bodyParams);
  });
};

const handleImagePost = (request, response) => {
  const basePath = path.resolve(staticBasePath);
  const normalizedPath = path.normalize(request.url);
  const reaplacedPath = normalizedPath.replace(/^(\.\.[\/\\])+/, '');

  const finalFileLocation = path.join(basePath, reaplacedPath);

  const res = response;
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    res.statusCode = 400;
    res.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const buffer = Buffer.concat(body);

    fs.writeFile(finalFileLocation, buffer, 'binary', (err) => {
      if (err) throw err;
      console.log('saved');
    });
    //jsonHandler.addUserClosets(request, res, bodyParams);
  });
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = parsedUrl.query;

  if (request.method === 'POST' && parsedUrl.pathname === '/addUserItem') {
    handlePost(request, response, parsedUrl);
  } else if (parsedUrl.pathname === '/addUserItemImage') {
    handleImagePost(request, response);
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.GET.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
