import React, { Component } from 'react';
import {
  LineChart, XAxis, YAxis, CartesianGrid, Line,
} from 'recharts';
import _ from 'lodash';
import moment from 'moment';
import { Modal } from 'semantic-ui-react';

export default class Rechart extends Component {
  state = {
    data: [{ x: 1, y: 2 }, { x: 2, y: 4 }],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.showExerciseStatistic !== this.props.showExerciseStatistic) {
      this.setState({
        data: this.getData(),
      });
    }
  }

  componentDidMount = () => {
    this.setState({
      data: this.getData(),
    });
  };

  getData = () => {
    const sumA = this.props.approaches.map(approach => ({
      // do simple format
      date: moment(new Date(approach.date)).format('D.MM'),
      // sum of values
      value: Number(approach.value) * approach.weight,
    }));
    const groupedApproaches = _.groupBy(sumA, 'date');
    const data = [];
    _.forIn(groupedApproaches, (value, key) => {
      data.push({
        // day in simple format, x-axis
        date: key,
        // summary value of all approaches for day devided by quantity of approaches for the day , y-axis
        value: value.reduce((a, b) => ({ value: a.value + b.value }), { value: 0 }).value / (10 * Number(value.length)),
      });
    });
    return data;
  };

  handleClose = () => this.props.handleClose();

  render() {
    const { data } = this.state;
    const { showExerciseStatistic: exercise } = this.props;
    const { clientWidth } = document.documentElement;
    const width = clientWidth > 900 ? 800 : clientWidth - 100;

    return (
      <Modal
        className="chart"
        open={!!exercise}
        onClose={this.handleClose}
        basic
        size="large"
        closeIcon
      >
        <Modal.Content>
          <h3>{exercise}</h3>
          <LineChart className="line-chart" width={width} height={width * 0.62} data={data}>
            <XAxis dataKey="date" stroke="#eee" />
            <YAxis dataKey="value" stroke="#eee" />
            <CartesianGrid stroke="#888" strokeDasharray="5 5" />

            <Line type="monotone" dataKey="value" stroke="#fb5454" />
          </LineChart>
        </Modal.Content>
      </Modal>
    );
  }
}
