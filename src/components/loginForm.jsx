import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "") {
      errors.username = "Username is required.";
    }
    if (account.password.trim() === "") {
      errors.password = "Password is required.";
    }

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    // call server here
    console.log("submit");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div className="">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            onChange={this.handleChange}
            value={account.username}
            error={errors.username}
            label="Username"
          />
          <Input
            name="password"
            onChange={this.handleChange}
            error={errors.password}
            value={account.password}
            label="Password"
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
