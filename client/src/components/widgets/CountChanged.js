import React from 'react';

class CountChanged extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  }

  render() {
    const percentChange = this.calcChange(this.props.data[0], this.props.data[1]);

    const increaseState = percentChange >= 0;
    const redGreenClass = increaseState ? 'm-green' : 'm-red';
    const arrowClass    = increaseState ? 'arrow-up' : 'arrow-down';

    return (
      <div className="cf-svmc">
        <div className="metric"> {this.props.data[1]} </div>
        <div className={['change', redGreenClass, 'metric-small'].join(' ')}>
          <div className={arrowClass}> </div>
          <span className="large">{percentChange}%</span>
        </div>
       </div>
    );
  }

  calcChange(oldNum, newNum) {
    return Math.round(100 * ((newNum - oldNum) / oldNum));
  }

}

export default CountChanged;
