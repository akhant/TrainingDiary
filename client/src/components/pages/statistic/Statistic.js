import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchData } from '../../../AC';
import elapsedTime from '../../../helpers';
import PickerDate from '../../PickerDate';
import Message from '../../messages/Message';
import Chart from './Chart';
import StatisticTable from './StatisticTable';

export class Statistic extends Component {
  state = {
    pickStatisticDate: this.props.params.pickDate || moment(),
    showExerciseStatistic: '',
  };

  componentDidMount = () => {
    this.setState({
      pickStatisticDate: this.props.params.pickDate,
    });
  };
  onClickMore = exerciseName => {
    this.setState({
      showExerciseStatistic: exerciseName,
    });
  };

  getWorkoutTime = () => {
    const { workoutTime } = _.find(this.props.statistic, {
      date: this.state.pickStatisticDate._d.toDateString(),
    });

    return elapsedTime(workoutTime);
  };
  handleChange = choosenDate => {
    this.setState(
      {
        pickStatisticDate: choosenDate,
      },
      () => {
        this.props.fetchData(this.state.pickStatisticDate);
      }
    );
  };

  render() {
    const { approaches } = this.props;

    const selectedApproaches = approaches.filter(
      approach =>
        approach.date === this.state.pickStatisticDate._d.toDateString()
    );

    const filteredApproaches = _.groupBy(selectedApproaches, 'exerciseName');
    // если в данный день нет подходов
    if (!selectedApproaches.length) {
      return (
        <div className="no_exercises">
          <PickerDate
            pickDateFromMain={this.state.pickStatisticDate}
            className="picker-date statistic__picker-date"
            handleChange={this.handleChange}
          />
          <h2 className="no_exercises_h2">No exercises this day</h2>
          <div className="link_to_main__wrapper">
            <Link className="link_to_main btn" to="/dashboard">
              {' '}
              To main{' '}
            </Link>
          </div>
        </div>
      );
    }
    // если есть подходы
    return (
      <Grid fluid>
        <Row>
          <Col>
            <PickerDate
              pickDateFromMain={this.state.pickStatisticDate}
              className="PickerDate statistic_pikerDate"
              handleChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <div className="training_time">
              <span>Training time: {this.getWorkoutTime()}</span>
            </div>

            <StatisticTable
              onClickMore={this.onClickMore}
              pickDate={this.state.pickStatisticDate}
              filteredApproaches={filteredApproaches}
            />
          </Col>
          <Col sm={1} />
          <Col sm={6}>
            {this.state.showExerciseStatistic && (
              <Chart
                showExerciseStatistic={this.state.showExerciseStatistic}
                approaches={approaches}
              />
            )}
          </Col>
        </Row>

        <Message />

        <Row>
          <Col>
            <div className="link_to_main__wrapper">
              <Link className="link_to_main btn" to="/dashboard">
                {' '}
                To main{' '}
              </Link>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(
  ({ statistic, approaches, params }) => ({
    statistic,
    approaches,
    params,
  }),
  { fetchData }
)(Statistic);
