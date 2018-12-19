import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeList, removeFromList } from '../../../AC/list';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import InlineError from '../../messages/InlineError';
import { Mutation } from 'react-apollo';
import { REMOVE_FROM_LIST } from '../../../queries';

class ChangeExerciseForm extends Component {
  state = {
    data: {
      exerciseName: '',
      weightFrom: 0,
      weightTo: 0,
    },
    loading: false,
    errors: {},
  };

  componentDidMount = () => {
    this.setState({ data: this.props.exercise });
  };

  onChangeInput = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  onRemoveExercise = async removeFromList => {
    await removeFromList();
    await this.props.refetchGetList();
    this.props.changeActiveIndex(null);
  };

  onSubmit = (e, serverData, addToList) => {
    e.preventDefault();
    const { data } = this.state;

    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      addToList({
        variables: {
          userId: serverData.getCurrentUser.userId,
          exerciseName: data.exerciseName,
          weightFrom: Number(data.weightFrom),
          weightTo: Number(data.weightTo),
        },
      });
      this.props.refetchGetList();
    }
  };

  validate = data => {
    const errors = {};

    if (!isAlphanumeric(data.exerciseName)) {
      errors.exerciseName =
        'Invlid exerciseName, use only decimals and english letters  ';
    }

    if (isNaN(+data.weightFrom)) {
      errors.weightFrom = 'Invalid value';
    }

    if (isNaN(+data.weightTo)) {
      errors.weightTo = 'Invalid value';
    }

    return errors;
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="ChangeExerciseForm">
        <Form onSubmit={this.onSubmit}>
          {/*<ul>
             {this.state.errors.map(error => (
              <li key={error}>{error}</li>
            ))} 
          </ul>*/}

          <Form.Field
            required
            label="Name of exercise"
            placeholder="Enter name of new exercise"
            control="input"
            name="exerciseName"
            onChange={this.onChangeInput}
            value={this.state.data.exerciseName}
          />
          {errors.exerciseName && <InlineError text={errors.exerciseName} />}
          <Form.Group>
            <Form.Field
              required
              label="Weight from"
              control="input"
              name="weightFrom"
              onChange={this.onChangeInput}
              value={this.state.data.weightFrom}
            />
            {errors.weightFrom && <InlineError text={errors.weightFrom} />}
            <Form.Field
              required
              label="Weight to"
              control="input"
              name="weightTo"
              onChange={this.onChangeInput}
              value={this.state.data.weightTo}
            />
            {errors.weightTo && <InlineError text={errors.weightTo} />}
          </Form.Group>
          <button className="btn inline" type="submit">
            {' '}
            Change exercise{' '}
          </button>
          <Mutation
            mutation={REMOVE_FROM_LIST}
            variables={{
              exerciseDescriptionId: this.props.exercise.exerciseDescriptionId,
            }}
          >
            {(removeFromList, { data }) => (
              <button
                type="button"
                className=" btn inline btn_remove"
                onClick={() => this.onRemoveExercise(removeFromList)}
              >
                Remove exercise
              </button>
            )}
          </Mutation>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  { changeList, removeFromList }
)(ChangeExerciseForm);
