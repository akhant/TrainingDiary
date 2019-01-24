import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { addParam } from '../AC';


class PickerDate extends Component {
  state = {
    date: this.props.params.PickDate || moment(),
  };

  // date for Statistic component
  componentDidMount = () => {
    const {pickDate} = this.props.params
    if (pickDate) {
      this.setState({
        date: pickDate,
      });
    }
  };



  handleChange = date => {
    this.setState(
      {
        date,
      },
      () => {
        this.props.addParam({ pickDate: date });

      }
    );
  };

  render() {
    
    return (
      <div className={this.props.className}>

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

export default connect(
  ({params}) => ({
    params
  }),
  { addParam }
)(PickerDate);
