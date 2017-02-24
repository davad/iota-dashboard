import Immutable from 'immutable';

const ImmutableState = Immutable.Map({
  fetching: false,
  data: Immutable.Map({}),
});


export const queryReducer = ( state = ImmutableState, action) => {
  console.log(state);
  console.log(action);

  switch (action.type) {

  case 'STARTING_REQUEST':
    return state.set('fetching', true);
  case 'FINISHED_REQUEST':
    return state.set('fetching', false)
                  .set('data', Immutable.Map(action.response.data));
  default:
    return state;

  }
};
