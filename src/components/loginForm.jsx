import React from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = (e) => {
    // call server here
    console.log("submit");
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div className="">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            onChange={this.handleChange}
            value={data.username}
            error={errors.username}
            label="Username"
          />
          <Input
            name="password"
            onChange={this.handleChange}
            error={errors.password}
            value={data.password}
            label="Password"
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
