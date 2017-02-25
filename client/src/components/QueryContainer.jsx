import React from 'react';
import { connect } from 'react-redux';
import { execQuery } from '../actions/actions';

class Query extends React.Component {
  componentDidMount() {
    this.props.dispatch(execQuery( 'query { transactions { sender, recipient, value } }' ));
  }


  render() {
    let dispatch = this.props.dispatch;
    let fetchInProgress = String(this.props.store.get('loading'));
    let transactions = this.props.store.get('data').get('transactions');
    let queryText;
    return (
      <div>
        <p>Fetch in progress: {fetchInProgress}</p>
        <div>
        {
          
          transactions ? transactions.map( tx => {
            const sender = tx.sender;
            return ( <div>{ sender }</div> )
          }):undefined
        }
        </div>
        <textarea ref={node => {queryText = node}}></textarea>
        <button onClick={() => {
          dispatch(execQuery(queryText.value))}
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

