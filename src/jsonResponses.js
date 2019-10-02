//this will hold all the "closets" of the users
const userClosets = {};

const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status, type) => {
    const headers = {
        'Content-Type': type,
    };

    response.writeHead(status, headers);
    response.end();
};

const success = (request, response) => {
    const responseJSON = {
        message: 'This is a successful response',
    };

    respondJSON(request, response, 200, responseJSON);
}

const getSuccessMeta = (request, response, type) => respondJSONMeta(request, response, 200, type);

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const getUserClosets = (request, response) => {
  // should default to good
  const responseJSON = {
    userClosets,
  };

  respondJSON(request, response, 200, responseJSON);
};

const addUserClosets = (request, response, body) => {
  const responseJSON = {
    message: 'name n age r required',
  };

  if (!body.name || !body.age) {
    respondJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (userClosets[body.name]) {
    responseCode = 204;
  } else {
    userClosets[body.name] = {};
  }

  userClosets[body.name].name = body.name;
  userClosets[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'created successfully!';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  console.log('added');

  return respondJSONMeta(request, response, responseCode);
};

const notReal = (request, response) => {
  // should default to good
  const responseJSON = {
    message: 'This was successfully not found',
    id: 'notFound',
  };

  respondJSON(request, response, 200, responseJSON);
};


module.exports = {
    success,
    badRequest,
    notFound,
    getUserClosets,
    addUserClosets,
    notReal,
};
