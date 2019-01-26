import React, { Component } from 'react';
import 'react-table/react-table.css';

export default class StatisticTable extends Component {
  tdRender = (approaches) => {
    let counter = 0;
    return approaches.map(({
      value, weight, approachId, restTime,
    }) => {
      counter++;
      return (
        <div key={approachId} className="elem_right__column">
          <div className="elem_right__column__cell column-counter">{counter}</div>
          <div className="elem_right__column__cell">{value}</div>
          <div className="elem_right__column__cell">{weight}</div>
          <div className="elem_right__column__cell">{Math.ceil(restTime / 1000)}</div>
        </div>
      );
    });
  };

  handleMoreClick = (exerciseName) => {
    this.props.onClickMore(exerciseName);
  };

  renderExerciseList = (approaches) => {
    const arr = [];
    for (const key in approaches) {
      arr.push(
        <div key={key} className="statistic-table__elem__wrapper">
          <div className="elem__header center">{key}</div>
          <div className="statistic-table__elem">
            <div className="elem_left">
              <div className="elem_left_row">Approach</div>
              <div className="elem_left_row">Repetition</div>
              <div className="elem_left_row">Weight</div>
              <div className="elem_left_row">Rest time</div>
            </div>
            <div className="elem_right">{this.tdRender(approaches[key])}</div>
          </div>
          <button className="btn statistic_more_btn" onClick={() => this.handleMoreClick(key)}>
            More...
          </button>
        </div>
      );
    }

    return arr;
  };

  render() {
    const { filteredApproaches } = this.props;

    return (
      <div className="statistic-table">
        {this.renderExerciseList(filteredApproaches)}

        <div />
      </div>
    );
  }
}
