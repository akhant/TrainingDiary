import React from 'react';
import _ from 'lodash';
import createReactClass from 'create-react-class';

const ReactD3 = require('react-d3-components');

const ScatterPlot = ReactD3.ScatterPlot;

const Chart = createReactClass({
  getInitialState() {
    return {
      data: {
        values: this.getData().length ? this.getData() : [{ x: new Date(2015, 2, 5), y: 1 }],
      },
    };
  },

  componentDidMount() {
    this.onMount();
  },

  componentDidUpdate(prevProps) {
    this.onUpdate(prevProps);
  },

  onMount() {
    this.setState({
      data: this.getData(),
    });
  },

  onUpdate(prevProps) {
    if (prevProps.showExerciseStatistic !== this.props.showExerciseStatistic) {
      this.setState({
        data: this.getData(),
      });
    }
  },
  getData() {
    const exerciseName = this.props.showExerciseStatistic;

    const data = {};
    let value = [];

    this.props.approaches.forEach((approach) => {
      if (approach.exerciseName === exerciseName) {
        value.push({
          date: approach.date,
          value: approach.value,
          weight: approach.weight,
          restTime: Math.ceil(approach.restTime / 1000),
        });
      }
    });

    // sort by date
    value = _.map(value, (v) => {
      const arr = [];
      const arrayDate = v.date.split(' ');
      arr[0] = arrayDate[2];
      arr[1] = `${arrayDate[1]},`;
      arr[2] = arrayDate[3];
      v.date = Date.parse(arr.join(' '));

      return v;
    });
    // group by date
    const grAp = _.groupBy(value, 'date');
    let _values = [];
    for (const key in grAp) {
      const len = grAp[key].length;
      let val = 0;
      let weight = 0;
      let bounce = 0;
      grAp[key].forEach((v) => {
        val += parseInt(v.value);
        weight += v.weight;
      });
      bounce = (Math.log10(val) * weight) / (10 * len);
      _values.push({ x: key, y: bounce });
    }
    // sort by date
    _values = _.sortBy(_values, 'x');
    // transform to necessary format
    data.values = _.map(_values, (v) => {
      const d = new Date();
      d.setTime(v.x);
      const zeroMonth = d.getMonth() + 1 < 10 ? '0' : '';
      v.x = `${d.getDate()}.${zeroMonth}${d.getMonth() + 1}`;
      return v;
    });
    return data;
  },

  render() {
    const tooltipScatter = function (x, y) {
      return `x: ${x} y:  ${y}`;
    };

    return (
      <div className="Chart">
        <h3 className="center">{this.props.showExerciseStatistic}</h3>
        <ScatterPlot
          data={this.state.data}
          width={800}
          height={400}
          margin={{
            top: 10,
            bottom: 50,
            left: 50,
            right: 20,
          }}
          tooltipHtml={tooltipScatter}
        />
      </div>
    );
  },
});

export default Chart;
