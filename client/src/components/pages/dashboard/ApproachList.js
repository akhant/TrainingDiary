import React from 'react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import Approach from './Approach';
import { addParam } from '../../../AC';
import { ADD_APPROACH, GET_DAY_DATA } from '../../../queries';

const ApproachList = (props) => {
  const {
    exercise,
    refetchGetDayData,
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
    // refetchGetDayData();
  };

  return (
    <div className="ApproachList">
      <br />
      <p className="approach_header">Approaches: </p>
      <Mutation mutation={ADD_APPROACH} refetchQueries={[{ query: GET_DAY_DATA, variables: { date: new Date().toDateString() } }]} >
        {addApproach => (
          <div
            role="button"
            tabIndex={0}
            className="addApproach_btn"
            onClick={e => onClickAddApproach(e, addApproach)}
          >
            +
          </div>
        )}
      </Mutation>
      <div className="approachList_items">
        {approaches.map((approach) => {
          if (approach.exerciseId === exercise.exerciseId) {
            return <Approach approach={approach} key={approach.approachId} {...props}  />;
          }
        })}
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
