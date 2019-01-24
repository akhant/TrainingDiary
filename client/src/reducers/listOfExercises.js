import { PUT_LIST_TO_REDUX } from '../constants';

export default (state = [], action) => {
  const { list, type } = action;
  switch (type) {
    case PUT_LIST_TO_REDUX:
    console.log("list redux", list)
      return list;
      
    default:
      return state;
  }
};
