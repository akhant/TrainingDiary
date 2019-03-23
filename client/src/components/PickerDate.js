import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withApollo } from 'react-apollo';

class PickerDate extends Component {
  state = {
    date: this.props.pickDate,
  };

  handleChange = async (date) => {
    this.props.onPickDate(date);
    this.setState({ date });

    await this.props.client.resetStore();
  };

  render() {
    return (
      <div className="picker-date__wrapper">
        <DatePicker
          dateFormat="DD.MM.YYYY"
          className="picker-date"
          selected={this.state.date}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withApollo(PickerDate);
