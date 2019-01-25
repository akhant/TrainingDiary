import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { REMOVE_APPROACH, CHANGE_APPROACH_VALUE } from '../../../queries';
import Weight from './Weight';

export class Approach extends Component {
  state = { 
    approachValue: '',
    finishApproach: 0,
    weight: 0
  };
  componentDidMount = () => {
    this.setState({
      approachValue: this.props.approach.value,
    });
  };

  handleChangeApproachValue = async (e, changeApproachValue) => {
    const value = e.target.value;
    this.setState({ approachValue: value });
    await changeApproachValue({ variables: { approachId: this.props.approach.approachId, value, finishApproachTime: Date.now().toString() } });
    this.props.refetchGetDayData();

    /* // exercise finished

    // exercise Time
    this.exerciseTime = Date.now() - this.props.startApproach;

    this.setState(
      {
        approachValue: e.target.value,
        finishApproach: Date.now(),
      },
      () => {
        // save changes
        this.props.onChangeApproachValue(
          this.state.approachValue,
          this.props.approach._id,
          this.exerciseTime,
          this.props.restTime,
          this.state.finishApproach
        );
      }
    ); */
  };

  handleDeleteApproach = async (removeApproach) => {
    await removeApproach();
    this.props.refetchGetDayData();
  };

  optionsList = () => {
    const list = [];
    for (let i = 0; i < 21; i++) {
      list.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return list;
  };

  render() {
    const { approach } = this.props;

    return (
      <div className="Approach">

            <Weight
            {...this.props}
            
          />

      
        <Mutation mutation={CHANGE_APPROACH_VALUE}>
          {changeApproachValue => (
            <select
              className="Approach__select custom_select"
              value={this.state.approachValue}
              onChange={e =>
                this.handleChangeApproachValue(e, changeApproachValue)
              }
            >
              {this.optionsList()}
            </select>
          )}
        </Mutation>
        <Mutation
          mutation={REMOVE_APPROACH}
          variables={{ approachId: approach.approachId }}
        >
          {removeApproach => (
            <div
              role="button"
              tabIndex={0}
              className="deleteApproach_btn"
              onClick={() => this.handleDeleteApproach(removeApproach)}
            >
              -
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Approach;
