import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Query, withApollo } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import elapsedTime from '../../../helpers';
import PickerDate from '../../PickerDate';
import Message from '../../messages/Message';
import Chart from './Chart';
import StatisticTable from './StatisticTable';
import { GET_DAY_DATA, GET_EXERCISE_APPROACHES } from '../../../queries';

class Statistic extends Component {
  state = {
    pickDate: moment(),
    showExerciseStatistic: '',
  };

  onClickMore = (exerciseName) => {
    this.setState({
      showExerciseStatistic: exerciseName,
    });
  };

  handleChange = (choosenDate) => {
    console.log('​Statistic -> handleChange -> choosenDate', choosenDate);

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

    const { pickDate, showExerciseStatistic } = this.state;

    return (
      <Query query={GET_DAY_DATA} variables={{ date: pickDate.format('ddd MMM DD YYYY') }}>
        {({ data: { getDayData }, loading }) => {
          /* if (loading) return <Loader />; */
          if (getDayData) {
            const { approaches, statistic } = getDayData;
            const filteredApproaches = _.groupBy(approaches, 'exerciseName');
            return (
              <Grid fluid>
                <Row>
                  <Col>
                    <PickerDate pickDate={pickDate} onPickDate={this.handleChange} />
                  </Col>
                </Row>
                <Row>
                  <Col sm={5}>
                    <div className="training_time">
                      <span>Training time:</span>{' '}
                      {statistic ? elapsedTime(Math.ceil(statistic.workoutTime / 1000)) : '0'}
                    </div>

                    <StatisticTable onClickMore={this.onClickMore} filteredApproaches={filteredApproaches} />
                  </Col>
                  <Col sm={1} />
                  <Col sm={6}>
                    {showExerciseStatistic && (
                      <Query query={GET_EXERCISE_APPROACHES} variables={{ exerciseName: showExerciseStatistic }}>
                        {({ data: { getExerciseApproaches }, loading: chartLoading }) => {
                          if (chartLoading) return <Loader />;
                          if (getExerciseApproaches) {
                            return (
                              <Chart
                                showExerciseStatistic={showExerciseStatistic}
                                approaches={getExerciseApproaches.approaches}
                              />
                            );
                          }
                        }}
                      </Query>
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

export default withApollo(
  connect(({ params }) => ({
    params,
  }))(Statistic)
);
