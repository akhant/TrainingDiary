import React from 'react';
import { Form } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';

import { withRouter } from 'react-router-dom';
import { SIGNIN_USER } from '../../../queries';
import InlineError from '../../messages/InlineError';
import { AuthContext } from '../../context';
import { validateForm } from '../../../helpers';

class LoginForm extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  };

  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = async (e, signinUser, refetch) => {
    e.preventDefault();

    const { errors, noErrors } = validateForm(this.state.data);
    this.setState({ errors });
    if (!noErrors) return;
    const {
      data: {
        signinUser: { token },
      },
    } = await signinUser();
    localStorage.setItem('TrainingDiaryToken', token);

    await refetch();
    this.props.history.push('/dashboard');
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Mutation mutation={SIGNIN_USER} variables={{ ...data }}>
        {(signinUser, { error: serverError }) => (
          <AuthContext.Consumer>
            {({ refetch }) => (
              <Form
                onSubmit={(e) => this.onSubmit(e, signinUser, refetch)}
                loading={loading}
              >
                <Form.Field error={!!errors.email}>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Username'
                    value={data.email}
                    onChange={this.onChange}
                  />

                  {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password'
                    value={data.password}
                    onChange={this.onChange}
                  />
                  {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <button className='btn'>Log in</button>
                {serverError && <InlineError text={serverError.message} />}
              </Form>
            )}
          </AuthContext.Consumer>
        )}
      </Mutation>
    );
  }
}

export default connect(({ user }) => ({ user }))(withRouter(LoginForm));
