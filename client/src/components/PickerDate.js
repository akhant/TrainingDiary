import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withApollo } from 'react-apollo';
import { addParam } from '../AC';
/* import { GET_DAY_DATA } from '../queries'; */

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
      <div>
        <DatePicker
          dateFormat="DD.MM.YYYY"
          className="react-datepicker"
          selected={this.state.date}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withApollo(
  connect(
    ({ params }) => ({
      params,
    }),
    { addParam }
  )(PickerDate)
);
