import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import { connect } from "react-redux";
import Delay from "react-delay";
import { Redirect } from "react-router-dom";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      email: ""
    },
    loading: false,
    errors: {},
    message: "",
    time: 5
  };

  componentDidUpdate = prevProps => {
    if (prevProps.user !== this.props.user && this.props.user.sended) {
      return this.setState(
        {
          loading: false,
          message: "Email has been sent. Please, check your email-box"
        },
        () => {
          this.timeCounter();
        }
      );
    }
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 1) {
      this.setState({ loading: true });
      this.props.submit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  };

  tick = () => {
    this.setState({ time: this.state.time - 1 });
  };

  timeCounter = () => {
    const timer = setInterval(this.tick, 1000);
    if (this.state.time === 0) clearInterval(timer);
  };

  render() {
    const { errors, data, loading } = this.state;

    if (this.state.message) {
      return (
        <div className="center">
          <Message style={{ fontSize: "30px" }} positive>
            {this.state.message}
          </Message>

          <h2> Redirect to main in {this.state.time} sec </h2>
          <Delay wait={5000}>
            <Redirect to="/" />
          </Delay>
        </div>
      );
    }

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <Message negative>{errors.global}</Message>}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Button className="btn" primary>
          I forgot
        </Button>
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default connect(({ user }) => ({ user }))(ForgotPasswordForm);
