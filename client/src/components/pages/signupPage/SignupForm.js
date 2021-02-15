import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import InlineError from '../../messages/InlineError';
import { SIGNUP_USER } from '../../../queries';
import { AuthContext } from '../../context';
import { validateForm } from '../../../helpers';

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

  componentDidUpdate = (prevProps) => {
    if (prevProps.user !== this.props.user && this.props.user) {
      return this.setState({ loading: false });
    }
  };

  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = (e, signupUser, refetch) => {
    e.preventDefault();
    const { errors, noErrors } = validateForm(this.state.data);
    this.setState({ errors });
    if (!noErrors) return;
    signupUser().then(async ({ data }) => {
      localStorage.setItem('TrainingDiaryToken', data.signupUser.token);
      await refetch();

      this.props.history.push('/dashboard');
    });
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Mutation mutation={SIGNUP_USER} variables={{ ...data }}>
        {(signupUser, { error }) => (
          <AuthContext.Consumer>
            {({ refetch }) => (
              <Form
                onSubmit={(e) => this.onSubmit(e, signupUser, refetch)}
                loading={loading}
              >
                <Form.Field error={!!errors.username}>
                  <input
                    id='username'
                    name='username'
                    placeholder='Username'
                    value={data.username}
                    onChange={this.onChange}
                  />

                  {errors.username && <InlineError text={errors.username} />}
                </Form.Field>
                <Form.Field error={!!errors.email}>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email'
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

                <button className='btn'>Sign Up</button>
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
