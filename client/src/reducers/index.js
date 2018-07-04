import { combineReducers } from "redux";
import date from "./date";
import exercises from "./exercise";
import approaches from "./approach";
import statistic from "./statistic";
import messages from "./messages";
import params from "./params";

export default combineReducers({
  date,
  exercises,
  approaches,
  statistic,
  messages,
  params
});
