import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Query, withApollo } from 'react-apollo';
import { Loader, Grid } from 'semantic-ui-react';
import PickerDate from '../../PickerDate';
import Message from '../../messages/Message';
import StatisticTable from './StatisticTable';
import TrainingTime from './TrainingTime';
import { GET_DAY_DATA, GET_EXERCISE_APPROACHES } from '../../../queries';
import Rechart from './Rechart';

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

  handleCloseModal = () => {
    this.setState({ showExerciseStatistic: '' });
  };

  handleChange = (choosenDate) => {
    this.setState({
      pickDate: choosenDate,
    });
  };

  componentDidMount = async () => {
    await this.props.client.reFetchObservableQueries({
      query: GET_DAY_DATA,
    });
  };

  render() {
    const { pickDate, showExerciseStatistic } = this.state;

    return (
      <Query query={GET_DAY_DATA} variables={{ date: pickDate.format('ddd MMM DD YYYY') }}>
        {({ data, data: { getDayData }, loading }) => {
          if (loading) return <Loader />;
          if (data && getDayData) {
            const { approaches, statistic } = getDayData;
            const filteredApproaches = _.groupBy(approaches, 'exerciseName');
            return (
              <Grid className="statistic">
                <Grid.Row>
                  <Grid.Column mobile={16} computer={8}>
                    <PickerDate pickDate={pickDate} onPickDate={this.handleChange} />
                  </Grid.Column>
                  <Grid.Column mobile={16} computer={8}>
                    <TrainingTime {...statistic} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                  <Grid.Column mobile={16} computer={12}>
                    <StatisticTable onClickMore={this.onClickMore} filteredApproaches={filteredApproaches} />

                    {showExerciseStatistic && (
                      <Query query={GET_EXERCISE_APPROACHES} variables={{ exerciseName: showExerciseStatistic }}>
                        {({ data: { getExerciseApproaches }, loading: chartLoading }) => {
                          if (chartLoading) return <Loader />;
                          if (getExerciseApproaches) {
                            return (
                              <Rechart
                                showExerciseStatistic={showExerciseStatistic}
                                handleClose={this.handleCloseModal}
                                approaches={getExerciseApproaches.approaches}
                              />
                            );
                          }
                        }}
                      </Query>
                    )}
                  </Grid.Column>
                </Grid.Row>

                <Message />
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
