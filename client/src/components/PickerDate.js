import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { addParam } from "../AC";


class PickerDate extends Component {
  state = {
    date: moment()
  };

//установить дату в Statistic
  componentDidMount = () => {
    if (this.props.pickDateFromMain) {
      this.setState({
        date: this.props.pickDateFromMain
      });
    }
  };

  componentDidUpdate = () => {
    if (
      this.props.pickDateFromMain &&
      this.state.date !== this.props.pickDateFromMain
    ) {
      this.setState({
        date: this.props.pickDateFromMain
      });
    }
  };

  handleChange = date => {
    this.setState(
      {
        date: date
      },
      () => {
        this.props.addParam({ pickDate: date });
        this.props.handleChange(date);
      }
    );
  };

  render() {
    return (
      <div className={this.props.className}>
        <DatePicker
          dateFormat="DD.MM.YYYY"
          className="react_datepicker"
          selected={this.state.date}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { addParam }
)(PickerDate);
