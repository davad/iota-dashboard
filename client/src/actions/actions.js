// Action types
export const QUERY_LOADING = 'QUERY_LOADING';
export const QUERY_FAIL    = 'QUERY_FAIL';
export const QUERY_SUCCESS = 'QUERY_SUCCESS';
export const TRANSACTIONS_LOADED = 'TRANSACTIONS_LOADED';

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

export function transactionsLoaded(response) {
  return {
    type: TRANSACTIONS_LOADED,
    response,
  };
}

export function getTransactions() {
  return dispatch => {
    execQuery(dispatch, 'query { transactions { sender, recipient, value } }', transactionsLoaded);
  };
}

function execQuery(dispatch, query, successAction) {
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
    return dispatch( successAction( json ) );
  })
  .catch( error => {
    return dispatch( queryFail( error ) );
  });
}

