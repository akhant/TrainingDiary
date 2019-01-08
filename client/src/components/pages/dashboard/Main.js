import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { showMessage, putListToRedux } from '../../../AC';
import ExerciseList from './ExerciseList';
import PickerDate from '../../PickerDate';
import Timer from './Timer';
import Message from '../../messages/Message';
import { ADD_EXERCISE, GET_DAY_DATA } from '../../../queries';
import { Mutation, Query, withApollo } from 'react-apollo';

export class Main extends Component {
  state = {
    pickDate: moment(),
  };

  onClickAddExercise = async (e, addExercise, refetchGetDayData) => {
    const date = this.state.pickDate.format('ddd MMM DD YY');
    await addExercise({ variables: { date } });
    await refetchGetDayData();
    /* if (!this.props.messages.started) {
      this.props.showMessage({
        message: 'First, click to "start training"',
      });
      return;
    }
    const todayDate = this.props.date.filter(d => {
      if (pickDate) {
        return d.date === pickDate._d.toDateString();
      }
    })[0];

    if (pickDate) {
      if (todayDate) {
        this.props.addExercise(pickDate, todayDate._id);
      } else {
        this.props.addExercise(pickDate);
      }
    } */
  };
/* static async getDerivedStateFromProps(props, state){
  console.log('main mount');
  const date = state.pickDate.format('ddd MMM DD YY');
  const { data } = await props.client.query({
    query: GET_DAY_DATA,
    variables: { date },
  });
  console.log('data  ', data);
  if (data && data.getDayData) {
    props.putListToRedux(data.getDayData.list);
  }
} */

 

  render() {
    const { pickDate } = this.state;
    const date = pickDate.format('ddd MMM DD YY');

    return (
      <Query query={GET_DAY_DATA} variables={{ date }}>
        {({ data, refetch }) => {
          if (data && data.getDayData) {
            const { exercises, approaches, list } = data.getDayData;

            return (
              <Mutation mutation={ADD_EXERCISE}>
                {addExercise => (
                  <Grid fluid>
                    <Row>
                      <Col sm={6}>
                        {/* <PickerDate
                          
                          className="PickerDate"
                          
                        /> */}
                      </Col>
                      <Col sm={6}>
                        <Timer pickDate={pickDate} />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <div className="exerciseList_with_buttons">
                          <button
                            className="btn"
                            onClick={e =>
                              this.onClickAddExercise(e, addExercise, refetch)
                            }
                          >
                            Add exercise
                          </button>

                          {/*  <div className="link-to-statistic__wrapper">
                            <Link
                              
                              className="link_to_statistic btn"
                              to="/statistic"
                            >
                              statistic{' '}
                            </Link>
                          </div> */}
                          {/* <div className="link-to-exercises__wrapper">
                            <Link className="btn" to="/exercises">
                              Exercises
                            </Link>
                          </div> */}

                          <ExerciseList
                            list={list}
                            exercises={exercises}
                            approaches={approaches}
                            pickDate={pickDate}
                            refetchGetDayData={refetch}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Message />
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

export default connect(
  ({ messages }) => ({}),
  {
    showMessage,
    putListToRedux,
  }
)(withApollo(Main));
