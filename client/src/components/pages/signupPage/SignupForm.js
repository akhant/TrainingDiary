import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import InlineError from '../../messages/InlineError';

class SignupForm extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  };

  componentDidUpdate = prevProps => {
    if (prevProps.user !== this.props.user && this.props.user) {
      return this.setState({ loading: false });
    }
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = 'Invalid email';
    if (!isAlphanumeric(data.password)) {
      errors.password =
        'Invlid password, use only decimals and english letters  ';
    }
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@email.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({ user }))(SignupForm);
