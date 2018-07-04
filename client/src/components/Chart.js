import React from "react";
import _ from "lodash";
import createReactClass from "create-react-class";

var ReactD3 = require("react-d3-components");

let ScatterPlot = ReactD3.ScatterPlot;

const Chart = createReactClass({
  getInitialState: function() {
    return {
      data: {
        values: this.getData().length
          ? this.getData()
          : [{ x: new Date(2015, 2, 5), y: 1 }]
      }
    };
  },
 
  componentDidMount: function() {
    this.onMount();
  },
  
  componentDidUpdate: function(prevProps) {
    this.onUpdate(prevProps);
  },

  onMount: function() {
    this.setState({
      data: this.getData()
    });
  },

  onUpdate: function(prevProps) {
    if (prevProps.showExerciseStatistic !== this.props.showExerciseStatistic) {
      this.setState({
        data: this.getData()
      });
    }
  },
  getData: function() {
    const exerciseName = this.props.showExerciseStatistic;

    let data = {};
    let value = [];

    this.props.approaches.map(approach => {
      if (approach.exerciseName === exerciseName) {
        value.push({
          date: approach.date,
          value: approach.value,
          weight: approach.weight,
          restTime: approach.restTime
        });
      }
    });

    // отсортировать по дате
    value = _.map(value, v => {
      let arr = [];
      let arrayDate = v.date.split(" ");
      arr[0] = arrayDate[2];
      arr[1] = arrayDate[1] + ",";
      arr[2] = arrayDate[3];
      v.date = Date.parse(arr.join(" "));

      return v;
    });
    //сгруппировать по дате
    let grAp = _.groupBy(value, "date");
    let _values = [];
    for (let key in grAp) {
      let len = grAp[key].length;
      let val = 0;
      let weight = 0;
      let bounce = 0;
      grAp[key].map(v => {
        val += parseInt(v.value);
        weight += v.weight;
      });
      bounce = (Math.log10(val) * weight) / (10 * len);
      _values.push({ x: key, y: bounce });
    }
    //отсортировать по дате
    _values = _.sortBy(_values, "x");
    //перевести в нужный формат даты
    data.values = _.map(_values, v => {
      let d = new Date();
      d.setTime(v.x);
      let zeroMonth = d.getMonth() + 1 < 10 ? "0" : "";
      v.x = `${d.getDate()}.${zeroMonth}${d.getMonth() + 1}.${d.getFullYear()}`;
      v.y = v.y;
      return v;
    });
    return data;
  },

  render: function() {
    let tooltipScatter = function(x, y) {
      return `x: ${x} y:  ${y}`;
    };

    return (
      <div className="Chart">
        <h3 className="center">{this.props.showExerciseStatistic}</h3>
        <ScatterPlot
          data={this.state.data}
          width={800}
          height={400}
          margin={{ top: 10, bottom: 50, left: 50, right: 20 }}
          tooltipHtml={tooltipScatter}
        />
      </div>
    );
  }
});

export default Chart;
