import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { Accordion, Icon } from "semantic-ui-react";
import ElementOfList from "./ElementOfList";
import { getListOfExercises, removeFromList } from "../../../AC/list";
import AddExerciseForm from "./AddExerciseForm";
import ChangeExerciseForm from "./ChangeExerciseForm";

class ExercisesPage extends Component {
  state = { activeIndex: "" };

  componentDidMount = () => {
    this.props.getListOfExercises();
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  removeExercise = id => {
    this.props.removeFromList(id);
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <div>
        <Grid>
          <Row>
            <Col sx={12} />
            <h1 className="center">ExercisesPage</h1>
          </Row>
          <Row>
            <Col sm={6}>
              <h3>List of exercises</h3>
              <Accordion styled>
                {this.props.listOfExercises.map((exercise, index) => (
                  <div key={exercise._id}>
                    <Accordion.Title
                      active={activeIndex === index}
                      index={index}
                      onClick={this.handleClick}
                    >
                      <Icon name="dropdown" />
                      {exercise.exerciseName}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                      <ChangeExerciseForm
                        exercise={exercise}
                        id={exercise._id}
                        removeExercise={this.removeExercise}
                      />
                    </Accordion.Content>
                  </div>
                ))}
              </Accordion>
            </Col>
            <Col sm={6}>
              <AddExerciseForm />
            </Col>
          </Row>
          <Link className="btn" to="/dashboard">
            Main page
          </Link>
        </Grid>
      </div>
    );
  }
}

export default connect(
  ({ listOfExercises }) => ({ listOfExercises }),
  { getListOfExercises }
)(ExercisesPage);
