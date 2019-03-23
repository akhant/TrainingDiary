import React, { Fragment } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { validateForm } from '../../../helpers';
import InlineError from '../../messages/InlineError';
import { SEND_FORGOT_PASSWORD } from '../../../queries';
import RedirectWithMessage from '../../messages/RedirectWithMessage';

class ForgotPasswordForm extends React.Component {
  state = {
    data: { email: '' },
    loading: false,
    errors: {},
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({
      data: { email: e.target.value },
    });
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
      this.setState({
        loading: false,
        redirect: true,
      });
    }
  };

  render() {
    const {
      errors, data, loading, redirect,
    } = this.state;

    if (redirect) {
      if (redirect) {
        return <RedirectWithMessage to="/" message="Confirmation email has been sent" time={5} />;
      }
    }

    return (
      <Mutation mutation={SEND_FORGOT_PASSWORD} variables={{ ...data }}>
        {(sendForgotPassword, { error }) => (
          <Fragment>
            <Form onSubmit={e => this.onSubmit(e, sendForgotPassword)} loading={loading}>
              {!!errors.global && <Message negative>{errors.global}</Message>}
              <Form.Field error={!!errors.email}>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={this.handleChange}
                  />
                </label>
                {errors.email && <InlineError text={errors.email} />}
              </Form.Field>
              <button className="btn">Send confirmation email</button>
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
