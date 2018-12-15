import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class AddExerciseForm extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Field
            required
            label="Name of exercise"
            placeholder="Enter name of new exercise"
            control="input"
            onChange={this.onChangeExerciseName}
          />
          <Form.Group>
            <Form.Field
              required
              label="Weight from"
              control="input"
              onChange={this.onChangeWeightFrom}
            />
            <Form.Field
              required
              label="Weight to"
              control="input"
              onChange={this.onChangeWeightTo}
            />
          </Form.Group>
          <button type="button" className="btn">
            {' '}

            Add new exercise
            {' '}
          </button>
        </Form>
      </div>
    );
  }
}
