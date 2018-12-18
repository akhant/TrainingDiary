import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import Delay from 'react-delay';
import { Redirect } from 'react-router-dom';
import InlineError from '../../messages/InlineError';

class ResetPasswordForm extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    loading: false,
    errors: {},
    time: 5,
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.user.passwordChanged !== this.props.user.passwordChanged &&
      this.props.user.passwordChanged
    ) {
      return this.setState({ loading: false }, () => {
        this.timeCounter();
      });
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

  tick = () => {
    this.setState({ time: this.state.time - 1 });
  };

  timeCounter = () => {
    const timer = setInterval(this.tick, 1000);
    if (this.state.time === 1) clearInterval(timer);
  };

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.passwordConfirmation) {
      errors.password = 'Passwords must match';
    }

    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;
    // success message and redirect to login page
    if (this.props.user.passwordChanged) {
      return (
        <div className="center">
          <Message style={{ fontSize: '30px' }} positive>
            Your password has been change
          </Message>

          <h2> Redirect to log in page in {this.state.time} sec </h2>
          <Delay wait={5000}>
            <Redirect to="/login" />
          </Delay>
        </div>
      );
    }

    return (
      <div>
        <h1 className="center">Let's reset password</h1>
        {/* if error return message and reload page in 10 sec */}
        {loading && (
          <div>
            <Message className="center" style={{ fontSize: '30px' }} negative>
              Oops, something goes wrong! Check your data again or confirm
              changing in email.
            </Message>

            {setTimeout(() => {
              window.location.reload(true);
            }, 10000)}
          </div>
        )}
        {/* if all is OK */}
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Form.Field>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc@def.com"
              value={data.email}
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </Form.Field>

          <Form.Field error={!!errors.password}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="your new password"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>

          <Form.Field error={!!errors.passwordConfirmation}>
            <label htmlFor="passwordConfirmation">
              Confirm your new password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="type it again, please"
              value={data.passwordConfirmation}
              onChange={this.onChange}
            />
            {errors.passwordConfirmation && (
              <InlineError text={errors.passwordConfirmation} />
            )}
          </Form.Field>

          <Button primary>Reset</Button>
        </Form>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({ user }))(ResetPasswordForm);