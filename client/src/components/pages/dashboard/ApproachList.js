import React, { Component } from 'react';
import { connect } from 'react-redux';
import Approach from './Approach';

import {
  addApproach,
  deleteApproach,
  changeApproach,
  showMessage,
} from '../../../AC';
import Weight from './Weight';
import { ADD_APPROACH } from '../../../queries';
import { Mutation } from 'react-apollo';
import { Message } from 'semantic-ui-react';

export class ApproachList extends Component {
  state = {
    startApproach: 0,
    finishApproach: 0,
    weight: 0,
    error: '',
  };

  onChangeApproachValue = (
    approachValue,
    approachId,
    exerciseTime,
    restTime,
    finishApproach
  ) => {
    this.setState({
      finishApproach,
    });
    this.props.changeApproach(
      approachValue,
      approachId,
      exerciseTime,
      restTime,
      this.state.weight
    );
    this.props.showMessage({
      message: '',
    });
  };

  onClickAddApproach = async (e, addApproach) => {
    if (!this.props.exercise.exerciseName) {
      this.setState({ error: 'Set exercise first' });
      return
    }
    
    if (!this.state.weight) {
      this.setState({ error: 'Set weight first' });
      return
    } 

      this.setState({ error: '' });
    

    await addApproach();
    this.props.refetchGetDayData();
    /* if (!this.checkMessage()) return;

    // approach start time
    this.setState({
      startApproach: Date.now(),
    });

    // send add approach
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

    // check is this approach first
    const firstTime = () => {
      const date = new Date();
      const today = date.toDateString();
      // start time for this day
      this.props.statistic.map(stat => {
        if (stat.date === today) {
          this.workoutStart = stat.workoutStart;
        }
      });
      // Are there approaches?
      return this.props.approaches.some(approach => approach.date === today); 
    };

    // rest time for first approach and next
    if (!firstTime()) {
      this.restTime = Math.round((Date.now() - this.workoutStart) / 1000);
    } else if (this.state.finishApproach) {
      this.restTime = Math.ceil(
        (Date.now() - this.state.finishApproach) / 1000
      );
    }
    */
  };


  onChangeWeight = weightValue => {
    this.setState({
      weight: weightValue,
    });
  };

  checkMessage = () => {
    /* // clear from screen
    this.props.showMessage({
      message: '',
    });
    if (!this.props.messages.started) {
      this.props.showMessage({
        message: 'First click "start training"',
      });
      return false;
    }

    // check not empty value
    if (this.props.statistic.length) {
      let flag = 0;
      this.props.approaches.map(approach => {
        if (!approach.value) {
          flag = 1;
        }
      });
      // if not fill preveus value
      if (flag === 1) {
        this.props.showMessage({ message: 'Fill previous approach' });
        return false;
      }
    }
    return true; */
  };

  render() {
    const {
      exercise,
      getDayData: { approaches, list },
    } = this.props;
    const { error, weight } = this.state;

    return (
      <div className="ApproachList">
        {error && <Message warning>{error}</Message>}
        {exercise.exerciseName && (
          <Weight
            weight={this.state.weight}
            list={list}
            exercise={exercise}
            onChangeWeight={this.onChangeWeight}
          />
        )}

        <br />
        <p className="approach_header">Approaches: </p>
        <Mutation
          mutation={ADD_APPROACH}
          variables={{ exerciseId: exercise.exerciseId, weight: +weight }}
        >
          {(addApproach, { data }) => (
            <div
              role="button"
              tabIndex={0}
              className="addApproach_btn"
              onClick={e => this.onClickAddApproach(e, addApproach)}
            >
              +
            </div>
          )}
        </Mutation>
        {/* filter exercise with necessary exercise id */}
        <div className="approachList_items">
          {approaches.map(approach => {
            if (approach.exerciseId === exercise.exerciseId) {
              return (
                <Approach
                  /* restTime={this.restTime}
                  startApproach={this.state.startApproach}
                  exercise={exercise}
                  
                  
                  onChangeApproachValue={this.onChangeApproachValue}
                  onDeleteApproach={this.onDeleteApproach} */
                  approach={approach}
                  key={approach.approachId}
                  {...this.props}
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
  ({ statistic, messages }) => ({
    statistic,
    messages,
  }),
  { addApproach, deleteApproach, changeApproach, showMessage }
)(ApproachList);
