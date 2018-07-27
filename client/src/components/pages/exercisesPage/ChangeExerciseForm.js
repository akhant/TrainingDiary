import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { changeList, removeFromList } from "../../../AC/list";

class ChangeExerciseForm extends Component {
  state = {
    exerciseName: "",
    weight: {
      from: "",
      to: ""
    },
    errors: []
  };

  componentDidMount = () => {
    this.setState({ ...this.props.exercise });
  };

  onRemoveExercise = () => {
    this.props.removeFromList(this.props.id);
  };

  onChangeExerciseName = e => this.setState({ exerciseName: e.target.value });
  onChangeWeightFrom = e =>
    this.setState({ weight: { ...this.state.weight, from: e.target.value } });
  onChangeWeightTo = e =>
    this.setState({ weight: { ...this.state.weight, to: e.target.value } });

  onSubmit = () => {
    if (this.validate(this.state).length !== 0) return null;
    this.props.changeList(this.props.id, this.state);
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
      <div className="ChangeExerciseForm">
        <Form onSubmit={this.onSubmit}>
          <ul>
            {this.state.errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <Form.Group>
            <Form.Field
              label="Change name of exercise"
              placeholder="Enter name of new exercise"
              control="input"
              value={this.state.exerciseName}
              onChange={this.onChangeExerciseName}
            />

            <Form.Field
              label="Weight from"
              control="input"
              value={this.state.weight.from}
              onChange={this.onChangeWeightFrom}
            />
            <Form.Field
              label="Weight to"
              control="input"
              value={this.state.weight.to}
              onChange={this.onChangeWeightTo}
            />
          </Form.Group>
          <button className="btn inline" type="submit">
            {" "}
            Change exercise{" "}
          </button>
          <button
            className=" btn inline btn_remove"
            onClick={this.onRemoveExercise}
          >
            Remove exercise
          </button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  { changeList, removeFromList }
)(ChangeExerciseForm);
