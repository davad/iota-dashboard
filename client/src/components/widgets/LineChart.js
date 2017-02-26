import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.number),
  }

  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [...Array(100)].map( (_, i) => i + 1),
        datasets: [
          {
            label: 'transactions',
            fillColor: '#F1E7E5',
            strokeColor: '#E8575A',
            pointColor: '#E8575A',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#ff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: this.props.data,
          },
        ],
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = Object.assign({}, this.state);
    newState.data.datasets[0].data = nextProps.data;
    this.setState({ data: newState.data });
  }

  render() {
    const options = {
      responsive: true,
      animation: false,
      tooltips: {
        mode: 'label',
      },
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            type: 'linear',
            gridLines: {
              display: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 1,
        },
      },
      pointDot: false,
      scaleFontSize: 1,
      scaleFontColor: 'rgba(0,0,0,0)',
    };
    return (
      <div >
        <Line data={this.state.data} options={options} height={210} width={800}/>
      </div>
    );
  }
}

export default LineChart;
