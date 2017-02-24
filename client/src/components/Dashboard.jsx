import React, { Component } from 'react';
import Dashboard, { addWidget } from 'react-dazzle';

// App components
import Header from './Header';
import EditBar from './EditBar';
import Container from './Container';
import AddWidgetDialog from './AddWidgetDialog';
import CustomFrame from './CustomFrame';
import { QueryContainer } from './QueryContainer';

// Widgets of the dashboard.
import BarChart from './widgets/BarChart';
import LineChart from './widgets/LineChart';
import DoughnutChart from './widgets/DoughnutChart';
import CountChanged from './widgets/CountChanged';

// We are using bootstrap as the UI library
import 'bootstrap/dist/css/bootstrap.css';

// Default styes of dazzle.
import 'react-dazzle/lib/style/style.css';

// Our styles
import '../styles/custom.css';
import '../styles/controlfrog.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Widgets that are available in the dashboard
      widgets: {
        EngineTelemetricsWidget: {
          type: BarChart,
          title: 'Engine',
        },
        PerformanceWidget: {
          type: DoughnutChart,
          title: 'Reactor Temp',
        },
        ShipVitalTelemetricsWidget: {
          type: LineChart,
          title: 'Reactor Telemetrics',
        },
      },
      // Layout of the dashboard
      layout: {
        rows: [{
          columns: [{
            className: 'col-md-12 col-sm-12 col-xs-12',
            widgets: [{key: 'ShipVitalTelemetricsWidget'}],
          }],
        }, {
          columns: [{
            className: 'col-md-8 col-sm-8 col-xs-8',
            widgets: [{key: 'EngineTelemetricsWidget'}],
          }, {
            className: 'col-md-4 col-sm-4 col-xs-4',
            widgets: [{key: 'PerformanceWidget'}],
          }],
        }],
      },
      editMode: false,
      isModalOpen: false,
      addWidgetOptions: null,
      data: [],
      transactions: [],
    };
  }

  /**
   * When a widget is removed, the layout should be set again.
   */
  onRemove = (layout) => {
    this.setState({
      layout: layout,
    });
  }

  /**
   * Adds new widgget.
   */
  onAdd = (layout, rowIndex, columnIndex) => {
    // Open the AddWidget dialog by seting the 'isModalOpen' to true.
    // Also preserve the details such as the layout, rowIndex, and columnIndex  in 'addWidgetOptions'.
    //  This will be used later when user picks a widget to add.
    this.setState({
      isModalOpen: true,
      addWidgetOptions: {
        layout,
        rowIndex,
        columnIndex,
      },
    });
  }

  /**
   * When a widget moved, this will be called. Layout should be given back.
   */
  onMove = (layout) => {
    this.setState({
      layout: layout,
    });
  }

  /**
   * This will be called when user tries to close the modal dialog.
   */
  onRequestClose = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  render() {
    return (
    <Container>
      <Header />
      <CountChanged data={[1,2]} />

      <QueryContainer />

    </Container>
    );
  }

  /**
   * Toggles edit mode in dashboard.
   */
  toggleEdit = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  /**
   * When user selects a widget from the modal dialog, this will be called.
   * By calling the 'addWidget' method, the widget could be added to the previous requested location.
   */
  handleWidgetSelection = (widgetName) => {
    const {layout, rowIndex, columnIndex} = this.state.addWidgetOptions;

    /**
     * 'AddWidget' method gives you the new layout.
     */
    this.setState({
      layout: addWidget(layout, rowIndex, columnIndex, widgetName),
    });

    // Close the dialogbox
    this.onRequestClose();
  }
}

export default App;
