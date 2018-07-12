import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import moment from "moment";
import {
  fetchData,
  addExercise,
  dropDatabase,
  showMessage,
  addParam
} from "../AC";
import ExerciseList from "./ExerciseList";
import PickerDate from "./PickerDate";
import Timer from "./Timer";
import Message from "./Message";

export class Main extends Component {
  state = {
    pickDate: moment()
  };

  componentDidMount = () => {
    if (this.props.params.pickDate) {
      this.setState(
        {
          pickDate: this.props.params.pickDate
        },
        () => {
          this.props.fetchData(this.state.pickDate);
        }
      );
    } else {
      this.props.fetchData(this.state.pickDate);
    }
  };

  onClickAddExercise = () => {
    if (!this.props.messages.started) {
      this.props.showMessage({
        message: 'Сначала нажмите "начать тренировку"'
      });
      return;
    }
    const todayDate = this.props.date.filter(d => {
      if (this.state.pickDate) {
        return d.date === this.state.pickDate._d.toDateString();
      }
    })[0];

    if (this.state.pickDate) {
      if (todayDate) {
        this.props.addExercise(this.state.pickDate, todayDate._id);
      } else {
        this.props.addExercise(this.state.pickDate);
      }
    }
  };

  handleChange = date => {
    this.setState({
      pickDate: date
    });

    this.props.fetchData(this.state.pickDate);
  };

  dropDatabase = () => {
    this.props.dropDatabase(this.state.pickDate);
  };

  handleStatisticClick = () => {
    // отправим pickDate в редакс
    this.props.addParam({ pickDate: this.state.pickDate });
  };

  render() {
    const { exercises } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col sm={6}>
            <PickerDate
              pickDateFromMain={this.state.pickDate}
              className="PickerDate"
              handleChange={this.handleChange}
            />
          </Col>
          <Col sm={6}>
            <Timer pickDate={this.state.pickDate} />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="exerciseList_with_buttons">
              <button className="btn" onClick={this.onClickAddExercise}>
                Добавить упражнение
              </button>
              <button className="btn" onClick={this.dropDatabase}>
                Очистить
              </button>
              <div className="link_to_statistic__wrapper">
                <Link
                  onClick={this.handleStatisticClick}
                  className="link_to_statistic btn"
                  to="/statistic"
                >
                  статистика{" "}
                </Link>
              </div>

              <ExerciseList
                pickDate={this.state.pickDate}
                exercises={exercises}
              />
            </div>
          </Col>
        </Row>

        <Message />
      </Grid>
    );
  }
}

export default connect(
  ({ date, exercises, messages, params }) => ({
    date,
    exercises,
   messages,
    params
  }),
  { addExercise, fetchData, dropDatabase, showMessage, addParam }
)(Main);
