import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import { ADD_TO_LIST } from '../../../queries';
import InlineError from '../../messages/InlineError';

export default class AddExerciseForm extends Component {
  state = {
    data: {
      exerciseName: '',
      weightFrom: 0,
      weightTo: 0,
    },
    errors: {},
  };

  onChangeInput = (e) => {
    console.log('​AddExerciseForm -> onChangeInput -> e', e.target);

    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });
  };

  onSubmit = (e, addToList) => {
    e.preventDefault();
    const { data } = this.state;

    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      addToList({
        variables: {
          exerciseName: data.exerciseName,
          weightFrom: Number(data.weightFrom),
          weightTo: Number(data.weightTo),
        },
      });
      this.props.refetchGetList();
    }
  };

  validate = (data) => {
    const errors = {};
    const from = +data.weightFrom;
    const to = +data.weightTo;
    // TODO: add spaces
    if (!isAlphanumeric(data.exerciseName)) {
      errors.exerciseName = 'Invlid exerciseName, use only decimals and english letters  ';
    }

    if (isNaN(from)) {
      errors.weightFrom = 'Invalid value';
    }

    if (isNaN(to)) {
      errors.weightTo = 'Invalid value';
    }

    if (to < from) {
      errors.weightTo = 'value of weight "to" has to be bigger than "from" or equal';
    }

    return errors;
  };

  render() {
    const { errors } = this.state;
    return (
      <Mutation mutation={ADD_TO_LIST}>
        {addToList => (
          <Form onSubmit={e => this.onSubmit(e, addToList)}>
            <Form.Field
              error={!!errors.exerciseName}
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
                error={!!errors.weightFrom}
                required
                label="Weight from"
                control="input"
                name="weightFrom"
                onChange={this.onChangeInput}
                value={this.state.data.weightFrom}
              />
              {errors.weightFrom && <InlineError text={errors.weightFrom} />}
              <Form.Field
                error={!!errors.weightTo}
                required
                label="Weight to"
                control="input"
                name="weightTo"
                onChange={this.onChangeInput}
                value={this.state.data.weightTo}
              />
              {errors.weightTo && <InlineError text={errors.weightTo} />}
            </Form.Group>
            <button type="submit" className="btn">
              {' '}
              Add new exercise{' '}
            </button>
          </Form>
        )}
      </Mutation>
    );
  }
}
