import React, { Component } from "react";
import "react-table/react-table.css";

export default class StatisticTable extends Component {
  tdRender = approaches => {
    let counter = 0;
    return approaches.map(approach => {
      counter++;
      return (
        <div key={approach._id} className="elem_right__column">
          <div className="elem_right__column__cell column-counter">{counter}</div>
          <div className="elem_right__column__cell">{approach.value}</div>
          <div className="elem_right__column__cell">{approach.weight}</div>
          <div className="elem_right__column__cell">
            {approach.restTime ? approach.restTime : 0}
          </div>
        </div>
      );
    });
  };

  handleMoreClick = exerciseName => {
    this.props.onClickMore(exerciseName);
  };

  renderExerciseList = approaches => {
    let arr = [];
    for (let key in approaches) {
      arr.push(
        <div key={key} className="statistic-table__elem__wrapper">
          <div className="elem__header center">{key}</div>
          <div className="statistic-table__elem">
            <div className="elem_left">
              <div className="elem_left_row">Подход</div>
              <div className="elem_left_row">Повторения</div>
              <div className="elem_left_row">Вес</div>
              <div className="elem_left_row">Время отдыха</div>
            </div>
            <div className="elem_right">{this.tdRender(approaches[key])}</div>
          </div>
          <button
            className="btn statistic_more_btn"
            onClick={() => this.handleMoreClick(key)}
          >
            Подробнее
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
