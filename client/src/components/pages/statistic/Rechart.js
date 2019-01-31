import React, { Component } from 'react';
import {
  LineChart, XAxis, YAxis, CartesianGrid, Line,
} from 'recharts';
import _ from 'lodash';
import moment from 'moment';

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

  render() {
    return (
      <LineChart className="line-chart" width={800} height={400} data={this.state.data}>
        <XAxis dataKey="date" stroke="#eee" />
        <YAxis dataKey="value" stroke="#eee" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />

        <Line type="monotone" dataKey="value" stroke="#DA032D" />
      </LineChart>
    );
  }
}
