import Immutable from 'immutable';
import {
  QUERY_SUCCESS,
  QUERY_FAIL,
  QUERY_LOADING,
  TRANSACTIONS_LOADED,
} from '../actions/actions';

const ImmutableState = Immutable.Map({
  loading: false,
  data: Immutable.Map({}),
  transactions: Immutable.List([]),
  values: Immutable.List([]),
});


export const queryReducer = ( state = ImmutableState, action) => {
  switch (action.type) {

  case QUERY_LOADING:
    return state.set('loading', true);
  case QUERY_FAIL:
    return state.set('loading', false);
  case QUERY_SUCCESS:
    return state.set('loading', false)
                  .set('data', Immutable.Map(action.response.data));
  case TRANSACTIONS_LOADED:
    return state.set('loading', false)
                  .set('data', Immutable.Map(action.response.data))
                  .set('transactions',
                       Immutable.List(action.response.data.transactions))
                  .set('values',
                       Immutable.List(action.response.data.transactions.map(
                         tx => {
                           return tx.value;
                         }
                       )));
  default:
    return state;

  }
};
