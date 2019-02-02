import React, { Component } from 'react';
import { Accordion, Loader, Grid } from 'semantic-ui-react';
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
            <Grid className="exercise-page">
              <Grid.Row>
                <Grid.Column width={8}>
                  <h3>List of exercises</h3>
                  <Accordion className="exercise-page__list" styled>
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
                </Grid.Column>
                <Grid.Column width={8}>
                  <h3>Add exercise</h3>
                  <AddExerciseForm />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default ExercisesPage;
