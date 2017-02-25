import Immutable from 'immutable';
import { QUERY_SUCCESS, QUERY_FAIL, QUERY_LOADING } from '../actions/actions';

const ImmutableState = Immutable.Map({
  loading: false,
  data: Immutable.Map({}),
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
  default:
    return state;

  }
};
