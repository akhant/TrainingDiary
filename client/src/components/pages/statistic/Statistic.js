import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import elapsedTime from '../../../helpers';
import PickerDate from '../../PickerDate';
import Message from '../../messages/Message';
import Chart from './Chart';
import StatisticTable from './StatisticTable';
import { Query } from 'react-apollo';
import { GET_DAY_DATA } from '../../../queries';

export class Statistic extends Component {
  state = {
    pickDate: /* this.props.params.pickDate || */ moment(),
    showExerciseStatistic: '',
  };

  
  onClickMore = exerciseName => {
    this.setState({
      showExerciseStatistic: exerciseName,
    });
  };


  handleChange = choosenDate => {
    this.setState({
      pickDate: choosenDate,
    });
  };

  render() {
    /* const { approaches } = this.props;

    const selectedApproaches = approaches.filter(
      approach =>
        approach.date === this.state.pickDate._d.toDateString()
    );

    const filteredApproaches = _.groupBy(selectedApproaches, 'exerciseName');
    // если в данный день нет подходов
    if (!selectedApproaches.length) {
      return (
        <div className="no-exercises">
          <PickerDate
            pickDateFromMain={this.state.pickDate}
            className="picker-date"
            handleChange={this.handleChange}
          />
          <h2 className="no-exercises_h2">No exercises this day</h2>
          <div className="link-to-main__wrapper">
            <Link className="link-to-main btn" to="/dashboard">
              {' '}
              To main{' '}
            </Link>
          </div>
        </div>
      );
    } */
    // если есть подходы

    return (
      <Query
        query={GET_DAY_DATA}
        variables={{ date: this.state.pickDate.format('ddd MMM DD YYYY') }}
      >
        {({ data: {getDayData} }) => {
          if (getDayData) {
            const { approaches, statistic } = getDayData;
            const filteredApproaches = _.groupBy(approaches, 'exerciseName');
            return (
              <Grid fluid>
                <Row>
                  <Col>
                    <PickerDate onPickDate={this.handleChange} />
                  </Col>
                </Row>
                <Row>
                  <Col sm={5}>
                    <div className="training_time">
                      <span>Training time: {statistic.workoutTime}</span>
                    </div>

                    <StatisticTable
                      onClickMore={this.onClickMore}
                      pickDate={this.state.pickDate}
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
                    <div className="link-to-main__wrapper">
                      <Link className="link-to-main btn" to="/dashboard">
                        {' '}
                        To main{' '}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Grid>
            );
          }

          return null;
        }}
      </Query>
    );
  }
}

export default connect(
  ({  params }) => ({
   
    params,
  })
)(Statistic);
