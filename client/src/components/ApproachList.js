import React, { Component } from "react";
import { connect } from "react-redux";
import Approach from "./Approach";

import {
  addApproach,
  deleteApproach,
  changeApproach,
  showMessage
} from "../AC";
import Weight from "./Weight";

export class ApproachList extends Component {
  state = {
    
    startApproach: 0,
    finishApproach: 0,
    weight: 40
  };

  onChangeApproachValue = (
    approachValue,
    approachId,
    exerciseTime,
    restTime,
    finishApproach
  ) => {
    this.setState({
      finishApproach: finishApproach
    });
    this.props.changeApproach(
      approachValue,
      approachId,
      exerciseTime,
      restTime,
      this.state.weight
    );
    this.props.showMessage({
      message: ""
    });
  };

  

  onClickAddApproach = () => {
    if (!this.checkMessage()) return;

    //время начала подхода
    this.setState({
      startApproach: Date.now()
    });

    //send add approach
    if (this.props.approaches.length) {
      this.props.addApproach(
        this.props.exercise.date,
        this.props.exercise.dateId,
        this.props.exercise._id,
        this.props.exercise.exerciseName,
        this.props.approaches[this.props.approaches.length - 1]._id
      );
    } else {
      this.props.addApproach(
        this.props.exercise.date,
        this.props.exercise.dateId,
        this.props.exercise._id,
        this.props.exercise.exerciseName
      );
    }

    //первый подход али нет
    const firstTime = () => {
      const date = new Date();
      const today = date.toDateString();
      //находим время начала для данного дня
      this.props.statistic.map(stat => {
        if (stat.date === today) {
          this.workoutStart = stat.workoutStart;
        }
      });
      //есть ли подходы
      return this.props.approaches.some(approach => {
        return approach.date === today;
      });
    };

    //если первый подход, то время отдыха = сейчас - время нажатия на "начать тренировку"
    //иначе сейчас - время окончания предыдущего подхода
    if (!firstTime()) {
      this.restTime = Math.round((Date.now() - this.workoutStart) / 1000);
    } else {
      if (this.state.finishApproach) {
        this.restTime = Math.ceil(
          (Date.now() - this.state.finishApproach) / 1000
        );
      }
    }
  };

  onDeleteApproach = approachId => {
    this.props.deleteApproach(approachId);
  };
  onChangeWeight = weightValue => {
    this.setState({
      weight: weightValue
    });
  };

  checkMessage = () => {
    //очистим сообщение с экрана
    this.props.showMessage({
      message: ""
    });
    if (!this.props.messages.started) {
      this.props.showMessage({
        message: 'Сначала нажмите "начать тренировку"'
      });
      return false;
    }

    //проверка заполненности всех полей
    if (this.props.statistic.length) {
      let flag = 0;
      this.props.approaches.map(approach => {
        if (!approach.value) {
          flag = 1;
        }
      });
      //если не заполнил предыдущее поле
      if (flag === 1) {
        this.props.showMessage({ message: "Заполните предыдущий подход" });
        return false;
      }
    }
    return true;
  };

  render() {
    const { approaches, exercise } = this.props;
    if (!approaches) return null;
    return (
      <div className="ApproachList">
        <Weight onChangeWeight={this.onChangeWeight} />
        <br />
        <p className="approach_header">Подходы: </p>
        <div role="button" tabIndex={0}  className="addApproach_btn" onClick={this.onClickAddApproach}>
          +
        </div>
        {/* отфильтровать из всех подходов только те, у которых exerciseId совпадает с exercise._id */}
        <div className="approachList_items">
          {approaches.map(approach => {
            if (approach.exerciseId === exercise._id) {
              return (
                <Approach
                  restTime={this.restTime}
                  startApproach={this.state.startApproach}
                  exercise={exercise}
                  key={approach._id}
                  approach={approach}
                  onChangeApproachValue={this.onChangeApproachValue}
                  onDeleteApproach={this.onDeleteApproach}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ approaches, statistic, messages }) => ({
    approaches: approaches,
    statistic: statistic,
    messages: messages
  }),
  { addApproach, deleteApproach, changeApproach, showMessage }
)(ApproachList);
