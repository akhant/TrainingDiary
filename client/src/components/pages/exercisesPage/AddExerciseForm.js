import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { addToList } from "../../../AC/list";

class AddExerciseForm extends Component {
  state = {
    exerciseName: "",
    weight: {
      from: 1,
      to: 50
    },
    errors: []
  };

  onChangeExerciseName = e => this.setState({ exerciseName: e.target.value });
  onChangeWeightFrom = e =>
    this.setState({ weight: { ...this.state.weight, from: e.target.value } });
  onChangeWeightTo = e =>
    this.setState({ weight: { ...this.state.weight, to: e.target.value } });

  onSubmit = () => {
    if (this.validate(this.state).length !== 0) return null;
    this.props.addToList(this.state);
  };

  validate = state => {
    const { weight, exerciseName } = state;
    const re = /[^$A-Za-z0-9\s]/g;
    const errors = [];
    for (let key in weight) {
      if (typeof +weight[key] !== "number" || !Number.isInteger(+weight[key])) {
        errors.push(`Field "${key}" have to be an integer number`);
      } else if (
        typeof +weight[key] == "number" &&
        (+weight[key] < 0 || +weight[key] > 300)
      ) {
        errors.push(`Value of field "${key}" have to be from 0 to 300`);
      }
    }
    if (re.test(exerciseName))
      errors.push("You can use only alphabet symbols and numbers");
    if (exerciseName.length > 100)
      errors.push("Exercise name length have to be less than 20");
    if (!errors.length) {
      this.setState({ errors: [] });
    } else {
      this.setState({ errors });
    }

    return errors;
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <ul>
            {this.state.errors.map(error => <li key={error}>{error}</li>)}
          </ul>

          <Form.Field
            required
            label="Name of exercise"
            placeholder="Enter name of new exercise"
            control="input"
            value={this.state.exerciseName}
            onChange={this.onChangeExerciseName}
          />
          <Form.Group>
            <Form.Field
              required
              label="Weight from"
              control="input"
              value={this.state.weight.from}
              onChange={this.onChangeWeightFrom}
            />
            <Form.Field
              required
              label="Weight to"
              control="input"
              value={this.state.weight.to}
              onChange={this.onChangeWeightTo}
            />
          </Form.Group>
          <button className="btn" type="submit">
            {" "}
            Add new exercise{" "}
          </button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  { addToList }
)(AddExerciseForm);
