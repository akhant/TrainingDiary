import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';

import { connect } from 'react-redux';
import InlineError from '../../messages/InlineError';
import { SIGNIN_USER } from '../../../queries';
import { Mutation } from 'react-apollo';
import isEmail from 'validator/lib/isEmail';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import {withRouter} from 'react-router-dom'

class LoginForm extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = (e, signinUser) => {
    e.preventDefault()

    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      signinUser().then(async ({ data }) => {
        localStorage.setItem('TrainingDiaryToken', data.signinUser.token);
        this.props.history.push('/dashboard');
      });
    }
  };

  validate = (data) => {
    const errors = {};

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
      <div>
        {/* {this.props.user.error && (
          <div>
            <Message style={{ fontSize: '30px', textAlign: 'center' }} negative>
              {this.props.user.error}
            </Message>
            {setTimeout(() => {
              window.location.reload(true);
            }, 5000)}
          </div>
        )} */}
        <Mutation mutation={SIGNIN_USER} variables={{ ...data }}>
          {(signinUser, { error }) => (
            <Form
              onSubmit={e => this.onSubmit(e, signinUser)}
              loading={loading}
            >
              <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  SIGNIN_USER
                  name="email"
                  placeholder="example@example.com"
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
                  placeholder="Make it secure"
                  value={data.password}
                  onChange={this.onChange}
                />
                {errors.password && <InlineError text={errors.password} />}
              </Form.Field>
              <Button primary>Login</Button>
              {error && <InlineError text={error.message} />}
            </Form>
          )}
        </Mutation>
      </div>
    );
  }
}



export default connect(({ user }) => ({ user }))(withRouter(LoginForm));
