import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Accordion, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import ElementOfList from './ElementOfList';
import AddExerciseForm from './AddExerciseForm';
import { GET_LIST } from '../../../queries';

class ExercisesPage extends Component {
  state = { activeIndex: null };

  handleClick = (index) => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? null : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Query query={GET_LIST}>
        {({ data, loading }) => {
          if (loading) return <Loader />;
          return (
            <Grid>
              <Row>
                <Col sx={12} />
                <h1 className="center">ExercisesPage</h1>
              </Row>
              <Row>
                <Col sm={6}>
                  <h3>List of exercises</h3>
                  <Accordion styled>
                    {data && data.getList ? (
                      data.getList.list.map((exercise, index) => (
                        <ElementOfList
                          index={index}
                          activeIndex={activeIndex}
                          handleClick={this.handleClick}
                          key={exercise.exerciseDescriptionId}
                          exercise={exercise}
                        />
                      ))
                    ) : (
                      <div>Add exercises to your list => </div>
                    )}
                  </Accordion>
                </Col>
                <Col sm={6}>
                  <h3 className="center">Add exercise</h3>
                  <AddExerciseForm />
                </Col>
              </Row>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default ExercisesPage;
