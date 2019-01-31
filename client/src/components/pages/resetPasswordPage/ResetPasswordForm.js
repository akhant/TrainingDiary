import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import InlineError from '../../messages/InlineError';
import { RESET_PASSWORD } from '../../../queries';
import { validateForm } from '../../../helpers';
import RedirectWithMessage from '../../messages/RedirectWithMessage';

class ResetPasswordForm extends React.Component {
  state = {
    data: {
      password: '',
      passwordConfirmation: '',
    },
    loading: false,
    errors: {},

    redirect: false,
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
      this.setState({ loading: false, redirect: true });
    }
  };

  render() {
    const {
      errors, data, loading, redirect,
    } = this.state;
    // success message and redirect to login page
    if (redirect) {
      return <RedirectWithMessage to="/login" message="Your password has been changed" time={5} />;
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
