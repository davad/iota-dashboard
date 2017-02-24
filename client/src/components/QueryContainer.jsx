import React from 'react';
import { connect } from 'react-redux';
import { getQuery } from '../actions/actions';

class Query extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      getQuery("{transaction(id: \"VHJhbnNhY3Rpb246NThhZjg1OGJjYzY1NTYyYWVmMGMwODM0\") {id, sender, recipient, value}}")
    );
  }

  render() {
    let dispatch = this.props.dispatch;
    let fetchInProgress = String(this.props.store.get('fetching'));
    let queryText;
    let goldberg = this.props.store.get('data').toObject();
    return (
      <div>
        <p>Fetch in progress: {fetchInProgress}</p>
        <p> {this.props.store.get('data')}</p>
        <h3>{ goldberg.id }</h3>
        <p>{ goldberg.sender }</p>
        <p>{ goldberg.recipient }</p>
        <p>{ goldberg.value }</p>
        <input ref={node => {queryText = node}}></input>
        <button onClick={() => {
          dispatch(getQuery(queryText.value))}
        }>
          query
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    store: state
  }
};
export const QueryContainer = connect(
 mapStateToProps
)(Query);

