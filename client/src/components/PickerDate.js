import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { addParam } from '../AC';
import {withApollo} from 'react-apollo'
import { GET_DAY_DATA } from '../queries'


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



  handleChange = async (date) => {
    this.props.onPickDate(date)
    this.setState(
      {
        date,
      },
      () => {
        this.props.addParam({ pickDate: date });
        
      }
    );
    await this.props.client.reFetchObservableQueries({
      query: GET_DAY_DATA,
      
    });
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

export default withApollo(connect(
  ({params}) => ({
    params
  }),
  { addParam }
)(PickerDate));
