const logger = store => next => action => {
  console.debug("Logger action", action);
  const result = next(action);
  console.debug("Logger store.getState()", store.getState());
  return result;
};

export default logger;
