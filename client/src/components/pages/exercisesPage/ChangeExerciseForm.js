import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { validateForm } from '../../../helpers';
import InlineError from '../../messages/InlineError';
import { REMOVE_FROM_LIST, CHANGE_LIST, GET_LIST } from '../../../queries';

class ChangeExerciseForm extends Component {
  state = {
    data: {
      exerciseName: '',
      weightFrom: 0,
      weightTo: 0,
    },

    errors: {},
  };

  componentDidMount = () => {
    this.setState({ data: this.props.exercise });
  };

  onChangeInput = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  onRemoveExercise = async (removeFromList) => {
    await removeFromList();

    this.props.changeActiveIndex(null);
  };

  onSubmit = async (e, changeList) => {
    e.preventDefault();
    const { errors, noErrors } = validateForm(this.state.data);
    this.setState({ errors });
    if (!noErrors) return;
    await changeList();
  };

  render() {
    const { errors, data } = this.state;
    const { exercise } = this.props;

    return (
      <div className="change-exercise__form">
        <Mutation
          mutation={CHANGE_LIST}
          variables={{
            exerciseDescriptionId: exercise.exerciseDescriptionId,
            exerciseName: data.exerciseName,
            weightFrom: Number(data.weightFrom),
            weightTo: Number(data.weightTo),
          }}
          refetchQueries={[{ query: GET_LIST }]}
        >
          {changeList => (
            <Form onSubmit={e => this.onSubmit(e, changeList)}>
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
              <button className="btn inline" type="submit">
                {' '}
                Change exercise{' '}
              </button>
              <Mutation
                mutation={REMOVE_FROM_LIST}
                variables={{
                  exerciseDescriptionId: this.props.exercise.exerciseDescriptionId,
                }}
                refetchQueries={[{ query: GET_LIST }]}
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
          )}
        </Mutation>
      </div>
    );
  }
}

export default ChangeExerciseForm;
