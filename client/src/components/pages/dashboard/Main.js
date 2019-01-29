import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { Mutation, Query, withApollo } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import { addParam } from '../../../AC';
import ExerciseList from './ExerciseList';
import Timer from './Timer';
import ErrorMessage from '../../messages/Message';
import { ADD_EXERCISE, GET_DAY_DATA } from '../../../queries';

export class Main extends Component {
  state = {
    pickDate: moment(),
  };

  onClickAddExercise = async (e, addExercise) => {
    const { started } = this.props.params;
    if (!started) {
      this.props.addParam({ message: 'First, click to "start"' });
      return;
    }
    const date = this.state.pickDate.format('ddd MMM DD YYYY');
    await addExercise({ variables: { date } });
  };

  componentDidMount = async () => {
    await this.props.client.reFetchObservableQueries({
      query: GET_DAY_DATA,
    });
  };

  componentWillUnmount = () => this.props.addParam({ message: '' });

  render() {
    const { pickDate } = this.state;
    const date = pickDate.format('ddd MMM DD YYYY');
    return (
      <Query query={GET_DAY_DATA} variables={{ date }}>
        {({ data, data: { getDayData }, refetch }, loading) => {
          if (loading) return <Loader />;
          if (data && getDayData) {
            return (
              <Mutation mutation={ADD_EXERCISE} refetchQueries={[{ query: GET_DAY_DATA, variables: { date } }]}>
                {addExercise => (
                  <Grid className="dashboard" fluid>
                    <ErrorMessage />
                    <Row>
                      <Col>
                        <Timer {...getDayData} pickDate={pickDate} />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <div className="exercise-list_with-buttons">
                          <button
                            className="btn exercise-list_with-buttons__btn"
                            onClick={e => this.onClickAddExercise(e, addExercise, refetch)}
                          >
                            Add exercise
                          </button>
                          <ExerciseList getDayData={getDayData} pickDate={pickDate} refetchGetDayData={refetch} />
                        </div>
                      </Col>
                    </Row>
                  </Grid>
                )}
              </Mutation>
            );
          }
          return null;
        }}
      </Query>
    );
  }
}

export default withApollo(
  connect(
    ({ params }) => ({ params }),
    {
      addParam,
    }
  )(Main)
);
