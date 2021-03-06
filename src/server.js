// server.js handles all the actual server stuff lol
// celeste yost :-]


const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/getUserClosets': jsonHandler.getUserClosets,
    '/addUserItem': jsonHandler.addUserItem,
    '/notReal': jsonHandler.notReal,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    // these should all be meta ones! bc no message :)
    '/getUserClosetsMeta': jsonHandler.getUsersMeta,
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

    jsonHandler.addUserItem(request, res, bodyParams);
  });
};


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  //console.log(params);

  if (request.method === 'POST' && parsedUrl.pathname === '/addUserItem') {
    handlePost(request, response, parsedUrl);
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct.GET.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
