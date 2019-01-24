import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Accordion, Icon } from 'semantic-ui-react';
import ElementOfList from './ElementOfList';
import AddExerciseForm from './AddExerciseForm';
import { Query } from 'react-apollo';
import { GET_LIST } from '../../../queries';
import { putListToRedux } from '../../../AC';
import { connect } from 'react-redux';

class ExercisesPage extends Component {
  state = { activeIndex: null };

  handleClick = index => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? null : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <div>
        <Query query={GET_LIST}>
          {({ data, refetch }) => {
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
                    </Accordion>
                  </Col>
                  <Col sm={6}>
                    <h3 className="center">Add exercise</h3>
                    <AddExerciseForm refetchGetList={refetch} />
                  </Col>
                </Row>
              </Grid>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default connect(
  null,
  { putListToRedux }
)(ExercisesPage);
