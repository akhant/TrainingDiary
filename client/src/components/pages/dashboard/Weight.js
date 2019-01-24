import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import {CHANGE_APPROACH_WEIGHT} from '../../../queries'
import _ from 'lodash';

class Weight extends Component {
  state = {
    weight: this.props.approach.weight,
  };
  handleChangeWeight = async (e, changeApproachWeight) => {
    const value = e.target.value
    this.setState({
      weight: value,
    });
    await changeApproachWeight({variables: { approachId: this.props.approach.approachId, weight: +value}})
    
  };

  optionsList = () => {
    const exercise = _.find(
      this.props.getDayData.list,
      e => this.props.exercise.exerciseName === e.exerciseName
    );

    const renderList = [];
    
    if (exercise) {
      for (let i = exercise.weightTo; i > exercise.weightFrom; i--) {
        renderList.push(
          <option key={i + 1} value={i}>
            {i}
          </option>
        );
      }
      return renderList;
    }
  };

  render() {
    return (
      <Mutation mutation={CHANGE_APPROACH_WEIGHT}>
          {changeApproachWeight => (
            <div className="weight">
            <span className="weight_header">Вес: </span>
            <select
              className="weight__select custom_select"
              value={this.state.weight}
              onChange={(e) => this.handleChangeWeight(e, changeApproachWeight)}
            >
              {this.optionsList()}
            </select>
          </div>
          )}
        </Mutation>
      
    );
  }
}

Weight.propTypes = {
  onChangeWeight: PropTypes.func,
};

export default Weight;
