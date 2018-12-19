import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Accordion, Icon } from 'semantic-ui-react';
import ElementOfList from './ElementOfList';
import { getListOfExercises, removeFromList } from '../../../AC/list';
import AddExerciseForm from './AddExerciseForm';
import ChangeExerciseForm from './ChangeExerciseForm';
import { Query } from 'react-apollo';
import { GET_LIST } from '../../../queries';

class ExercisesPage extends Component {
  state = { activeIndex: null };

  handleClick = (index) => {
    console.log(index)
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? null : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <div>
        <Query query={GET_LIST}>
          {({ data, refetch }) => (
            <Grid>
              <Row>
                <Col sx={12} />
                <h1 className="center">ExercisesPage</h1>
              </Row>
              <Row>
                <Col sm={6}>
                  <h3>List of exercises</h3>
                  <Accordion styled>
                    {data.getList ? (
                      data.getList.list.map((exercise, index) => (
                        <ElementOfList
                          index={index}
                          activeIndex={activeIndex}
                          handleClick={this.handleClick}
                          refetchGetList={refetch}
                          key={exercise.exerciseDescriptionId}
                          exercise={exercise}
                        />
                      ))
                    ) : (
                      <div>Add exercises to your list => </div>
                    )}

                    {/* <div key={exercise._id}>
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
                  </div> */}
                  </Accordion>
                </Col>
                <Col sm={6}>
                  <AddExerciseForm refetchGetList={refetch} />
                </Col>
              </Row>
              <Link className="btn" to="/dashboard">
                Main page
              </Link>
            </Grid>
          )}
        </Query>
      </div>
    );
  }
}

export default connect(
  ({ listOfExercises }) => ({ listOfExercises }),
  { getListOfExercises }
)(ExercisesPage);
