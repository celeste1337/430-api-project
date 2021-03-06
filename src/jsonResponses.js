// this will hold the closet of the users
const userClosets = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  response.writeHead(status, headers);
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  return respondJSON(request, response, 200, responseJSON);
};


const badRequest = (request, response) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const getUserClosets = (request, response) => {
  // should default to good
  const responseJSON = {
    userClosets,
  };

  respondJSON(request, response, 200, responseJSON);
};
const getUserClosetsMeta = (request, response) => respondJSONMeta(request, response, 200);


const addUserItem = (request, response, body) => {
  const responseJSON = {
    message: 'image, name, and cost are required!!',
  };

  if (!body.name || !body.cost || !body.category || !body.url) {
    respondJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  // item name does it all i guess
  if (userClosets[body.name]) {
    responseCode = 204;
  } else {
    userClosets[body.name] = {};
  }

  userClosets[body.name].name = body.name;
  userClosets[body.name].cost = body.cost;
  userClosets[body.name].category = body.category;
  userClosets[body.name].url = body.url;

  if (responseCode === 201) {
    responseJSON.message = 'created successfully!';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  console.log('added');

  return respondJSONMeta(request, response, responseCode);
};

const addItemMeta = (request, response) => respondJSONMeta(request, response, 200);


const notReal = (request, response) => {
  // should default to good
  const responseJSON = {
    message: 'This was successfully not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 200, responseJSON);
};


module.exports = {
  success,
  badRequest,
  notFound,
  getUserClosets,
  getUserClosetsMeta,
  addUserItem,
  addItemMeta,
  notReal,
};
