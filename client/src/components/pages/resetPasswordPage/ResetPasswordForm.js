import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import Delay from 'react-delay';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import InlineError from '../../messages/InlineError';
import { RESET_PASSWORD } from '../../../queries';
import { validateForm } from '../../../helpers';

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

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
  });

  onSubmit = async (e, resetPassword) => {
    e.preventDefault();
    const { errors, noErrors } = validateForm(this.state.data);
    this.setState({ errors });
    if (!noErrors) return;
    this.setState({ loading: true });
    const {
      data: { resetPassword: response },
    } = await resetPassword();
    if (response) {
      this.setState({ loading: false }, () => {
        this.timeCounter();
      });
    }
  };

  tick = () => {
    this.setState({ time: this.state.time - 1 });
  };

  timeCounter = () => {
    this.timer = setInterval(this.tick, 1000);
    if (this.state.time === 0) clearInterval(this.timer);
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
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
              Oops, something goes wrong! Check your data again or confirm changing in email.
            </Message>

            {setTimeout(() => {
              window.location.reload(true);
            }, 5000)}
          </div>
        )}
        {/* if all is OK */}
        <Mutation mutation={RESET_PASSWORD} variables={{ email: data.email, password: data.password }}>
          {resetPassword => (
            <Form onSubmit={e => this.onSubmit(e, resetPassword)} loading={loading}>
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
                <label htmlFor="passwordConfirmation">Confirm your new password</label>
                <input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  placeholder="type it again, please"
                  value={data.passwordConfirmation}
                  onChange={this.onChange}
                />
                {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
              </Form.Field>

              <Button primary>Reset</Button>
            </Form>
          )}
        </Mutation>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({ user }))(ResetPasswordForm);
