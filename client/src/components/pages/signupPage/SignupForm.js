import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import InlineError from '../../messages/InlineError';
import { SIGNUP_USER } from '../../../queries';
import { Mutation } from 'react-apollo';
import { AuthContext } from '../../context';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  state = {
    data: {
      username: '',
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

  onSubmit = (e, signupUser, refetch) => {
    e.preventDefault();

    const errors = this.validate(this.state.data);

    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      signupUser().then(async ({ data }) => {
        localStorage.setItem('TrainingDiaryToken', data.signupUser.token);
        await refetch();

        this.props.history.push('/dashboard');
      });
    }
  };

  validate = data => {
    const errors = {};
    if (!isAlphanumeric(data.username)) {
      errors.username =
        'Invlid username, use only decimals and english letters  ';
    }
    if (data.username.length < 2) {
      errors.username = 'Password has to be at least 2 characters';
    }
    if (!isEmail(data.email)) errors.email = 'Invalid email';
    if (!isAlphanumeric(data.password)) {
      errors.password =
        'Invlid password, use only decimals and english letters  ';
    }
    if (data.password.length < 8)
      errors.password = 'Password has to be at least 8 characters';

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Mutation mutation={SIGNUP_USER} variables={{ ...data }}>
        {(signupUser, { error }) => (
          <AuthContext.Consumer>
            {({ refetch }) => (
              <Form
                onSubmit={e => this.onSubmit(e, signupUser, refetch)}
                loading={loading}
              >
                <Form.Field error={!!errors.username}>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    placeholder="Enter your name"
                    value={data.username}
                    onChange={this.onChange}
                  />
                  {errors.username && <InlineError text={errors.username} />}
                </Form.Field>
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
                <br />
                {error && <InlineError text={error.message} />}
              </Form>
            )}
          </AuthContext.Consumer>
        )}
      </Mutation>
    );
  }
}

export default connect(({ user }) => ({ user }))(withRouter(SignupForm));
