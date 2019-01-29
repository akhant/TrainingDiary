import React from 'react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { Icon } from 'semantic-ui-react';
import Approach from './Approach';
import { addParam } from '../../../AC';
import { ADD_APPROACH, GET_DAY_DATA } from '../../../queries';

const ApproachList = (props) => {
  const {
    exercise,
    getDayData: { approaches },
    params: { started },
    addParam,
  } = props;
  const checkParams = () => {
    // clear from screen
    addParam({
      message: '',
    });
    // if day didn't start
    if (!started) {
      addParam({
        message: 'Click "start" first',
      });
      return false;
    }
    // if didn't choose exercise
    if (!exercise.exerciseName) {
      addParam({ message: 'Set exercise first' });
      return false;
    }

    // if some approach value is empty
    if (approaches.length && !approaches.every(approach => approach.value !== '0')) {
      addParam({ message: 'Fill previous approach' });
      return false;
    }

    return true;
  };

  const onClickAddApproach = async (e, addApproach) => {
    if (!checkParams()) return;

    await addApproach({
      variables: { exerciseId: exercise.exerciseId, startApproachTime: Date.now().toString() },
    });
  };

  const filteredApproachesByExerciseId = approaches.filter(approach => approach.exerciseId === exercise.exerciseId);

  return (
    <div className="approach-list">
      <br />

      <Mutation
        mutation={ADD_APPROACH}
        refetchQueries={[{ query: GET_DAY_DATA, variables: { date: new Date().toDateString() } }]}
      >
        {addApproach => (
          <div
            role="button"
            tabIndex={0}
            className="approach-list__btn_add"
            onClick={e => onClickAddApproach(e, addApproach)}
          >
            <Icon size="mini" name="add circle" />
          </div>
        )}
      </Mutation>
      <div className="approach-list__signs">
        <Icon className="approach-list__icon_up" name="balance scale" />
        <Icon className="approach-list__icon_down" name="pencil" />
      </div>
      <div className="approach-list__items">
        {filteredApproachesByExerciseId.map(approach => <Approach approach={approach} key={approach.approachId} {...props} />)}
      </div>
    </div>
  );
};

export default connect(
  ({ params }) => ({
    params,
  }),
  { addParam }
)(ApproachList);
