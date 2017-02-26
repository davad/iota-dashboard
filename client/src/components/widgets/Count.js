import React from 'react';

class Count extends React.Component {
  static propTypes = {
    data: React.PropTypes.number.isRequired,
  }

  render() {
    return (
      <div className="cf-svmc bigger">
        <div className="metric"> {this.props.data} </div>
      </div>
    );
  }
}

export default Count;
