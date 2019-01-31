import React, { Fragment } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Delay from 'react-delay';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { validateForm } from '../../../helpers';
import InlineError from '../../messages/InlineError';
import { SEND_FORGOT_PASSWORD } from '../../../queries';

class ForgotPasswordForm extends React.Component {
  state = {
    data: { email: '' },
    loading: false,
    errors: {},
    message: '',
    time: 5,
  };

  handleChange = (e) => {
    this.setState({
      data: { email: e.target.value },
    });
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  onSubmit = async (e, sendForgotPassword) => {
    e.preventDefault();
    const { errors, noErrors } = validateForm(this.state.data);
    this.setState({ errors });
    if (!noErrors) return;

    this.setState({ loading: true });
    const {
      data: {
        sendForgotPassword: { ok },
      },
    } = await sendForgotPassword();

    if (ok) {
      this.setState(
        {
          loading: false,
          message: 'Email has been sent. Please, check your email-box',
        },
        () => {
          this.timeCounter();
        }
      );
    }
  };

  tick = () => {
    this.setState({ time: this.state.time - 1 });
  };

  timeCounter = () => {
    this.timer = setInterval(this.tick, 1000);
    if (this.state.time === 0) clearInterval(this.timer);
  };

  render() {
    const {
      errors, data, loading, time, message,
    } = this.state;

    if (message) {
      return (
        <div className="center">
          <Message style={{ fontSize: '30px' }} positive>
            {message}
          </Message>

          <h2> Redirect to main in {time} sec </h2>
          <Delay wait={time * 1000}>
            <Redirect to="/" />
          </Delay>
        </div>
      );
    }

    return (
      <Mutation mutation={SEND_FORGOT_PASSWORD} variables={{ ...data }}>
        {(sendForgotPassword, { error }) => (
          <Fragment>
            <Form onSubmit={e => this.onSubmit(e, sendForgotPassword)} loading={loading}>
              {!!errors.global && <Message negative>{errors.global}</Message>}
              <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  value={data.email}
                  onChange={this.handleChange}
                />
                {errors.email && <InlineError text={errors.email} />}
              </Form.Field>
              <Button className="btn" primary>
                Send confirmation email
              </Button>
            </Form>

            {error && (
              <Message style={{ textAlign: 'center' }} negative>
                {error.message}
              </Message>
            )}
          </Fragment>
        )}
      </Mutation>
    );
  }
}

export default ForgotPasswordForm;
