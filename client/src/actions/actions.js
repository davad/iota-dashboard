// Action types
export const QUERY_LOADING = 'QUERY_LOADING';
export const QUERY_FAIL    = 'QUERY_FAIL';
export const QUERY_SUCCESS = 'QUERY_SUCCESS';

export function queryLoading(query) {
  return {
    type: QUERY_LOADING,
    query,
  };
}

export function queryFail(error) {
  return {
    type: QUERY_FAIL,
    error,
  };
}

export function querySuccess(response) {
  return {
    type: QUERY_SUCCESS,
    response,
  };
}

export function execQuery(query) {
  return dispatch => {
    dispatch(queryLoading(query));

    const payload = {
      query: query,
    };

    fetch( '/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then( response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.body);
    }).then( json => {
      return dispatch( querySuccess( json ) );
    })
    .catch( error => {
      return dispatch( queryFail( error ) );
    });
  };
}

