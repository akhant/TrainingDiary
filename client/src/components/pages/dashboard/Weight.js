import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Weight extends Component {
  state = {
    weight: 40,
  };
  handleChangeWeightValue = e => {
    this.setState({
      weight: e.target.value,
    });
    this.props.onChangeWeight(e.target.value);
  };

  optionsList = () => {
    const list = [];
    for (let i = 40; i > 9; i--) {
      list.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return list;
  };
  render() {
    return (
      <div className="Weight">
        <span className="weight_header">Вес: </span>
        <select
          className="Weight__select custom_select"
          value={this.state.weight}
          onChange={this.handleChangeWeightValue}
        >
          {this.optionsList()}
        </select>
      </div>
    );
  }
}

Weight.defaultProps = {
  onChangeWeight: null,
};

Weight.propTypes = {
  onChangeWeight: PropTypes.func,
};
