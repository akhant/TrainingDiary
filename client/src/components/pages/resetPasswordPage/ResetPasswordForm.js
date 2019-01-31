import React from 'react';
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
      password: '',
      passwordConfirmation: '',
    },
    loading: false,
    errors: {},
    time: 5,
    message: '',
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
      data: { resetPassword: ok },
    } = await resetPassword();
    if (ok) {
      this.setState({ loading: false, message: 'Your password has been changed' }, () => {
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
    const {
      errors, data, loading, message,
    } = this.state;
    // success message and redirect to login page
    if (message) {
      return (
        <div className="center">
          <Message style={{ fontSize: '30px' }} positive>
            {message}
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

        {/* if all is OK */}
        <Mutation mutation={RESET_PASSWORD} variables={{ password: data.password, token: this.props.token }}>
          {resetPassword => (
            <Form onSubmit={e => this.onSubmit(e, resetPassword)} loading={loading}>
              <Form.Field error={!!errors.password}>
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
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
                  placeholder="password confirmation"
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

export default ResetPasswordForm;
