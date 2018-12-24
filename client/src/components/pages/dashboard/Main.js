import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import {
  fetchData,
  addExercise,
  dropDatabase,
  showMessage,
  addParam,
} from '../../../AC';
import ExerciseList from './ExerciseList';
import PickerDate from '../../PickerDate';
import Timer from './Timer';
import Message from '../../messages/Message';

export class Main extends Component {
  state = {
    pickDate: moment(),
  };

  componentDidMount = () => {
    const { pickDate } = this.state
    if (this.props.params.pickDate) {
      this.setState(
        {
          pickDate: this.props.params.pickDate,
        },
        () => {
          this.props.fetchData(pickDate);
        }
      );
    } else {
      this.props.fetchData(pickDate);
    }
  };

  onClickAddExercise = () => {
    const { pickDate } = this.state
    if (!this.props.messages.started) {
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
    }
  };

  handleChange = date => {
    this.setState({
      pickDate: date,
    });

    this.props.fetchData(this.state.pickDate);
  };

  dropDatabase = () => {
    this.props.dropDatabase(this.state.pickDate);
  };

  handleStatisticClick = () => {
    // send pickDate to redux
    this.props.addParam({ pickDate: this.state.pickDate });
  };

  render() {
    const { exercises } = this.props;
    const { pickDate } = this.state
return (
  <Grid fluid>
      <Row>
        <Col sm={6}>
          <PickerDate
            pickDateFromMain={pickDate}
            className="PickerDate"
            handleChange={this.handleChange}
          />
        </Col>
        <Col sm={6}>
          <Timer pickDate={pickDate} />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <div className="exerciseList_with_buttons">
            <button className="btn" onClick={this.onClickAddExercise}>
              Add exercise
            </button>
            <button className="btn" onClick={this.dropDatabase}>
              Clear
            </button>
            <div className="link-to-statistic__wrapper">
              <Link
                onClick={this.handleStatisticClick}
                className="link_to_statistic btn"
                to="/statistic"
              >
                statistic{' '}
              </Link>
            </div>
            <div className="link-to-exercises__wrapper">
              <Link className="btn" to="/exercises">
                Exercises
              </Link>
            </div>

            <ExerciseList
              pickDate={pickDate}
              exercises={exercises}
            />
          </div>
        </Col>
      </Row>

      <Message />
    </Grid>
)
    
  }
}

export default connect(
  ({ date, exercises, messages, params }) => ({
    date,
    exercises,
    messages,
    params,
  }),
  {
    addExercise,
    fetchData,
    dropDatabase,
    showMessage,
    addParam,
  }
)(Main);
