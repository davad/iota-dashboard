const startingRequest = () => {
  return {
    type: 'STARTING_REQUEST',
  };
};

const finishedRequest = (response) => {
  return {
    type: 'FINISHED_REQUEST',
    response: response,
  };
};

export const getQuery = (query) => {
  const payload = {
    query: query,
  };
  return dispatch => {
    dispatch(startingRequest());
    return new Promise(
      function graphResponse(resolve, reject) {
        const request = new XMLHttpRequest();
        request.open( 'POST', '/graphql', true);
        request.setRequestHeader( 'Content-Type', 'application/json' );
        request.send( JSON.stringify(payload) );
        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            resolve( request.responseText );
          } else {
            reject( request.responseText );
          }
        };
      }).then(response =>
              dispatch(finishedRequest(JSON.parse(response))))
        .catch( e => {e;} );
  };
};

