import React, { Component } from "react";
import FormInput from "../form-input/form-input";
import Button from "../buttons/Buttons";
import "./signin.styles.scss";

import { auth, SignInWithGoogle } from "../../firebase/firebase";

export default class Signin extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: ""
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in">
        <h3 className="title">Posiadam już konto</h3>
        <span className="info">Zaloguj się podając email i hasło</span>

        <form action="" onSubmit={this.handleSubmit} className="form">
          <label htmlFor="" className="labe">
            Email
          </label>
          <FormInput
            name="email"
            type="text"
            value={this.state.email}
            required
            onChange={this.handleChange}
          />
          <label htmlFor="" className="labe">
            Hasło
          </label>
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            required
            onChange={this.handleChange}
          />
          <Button type="submit">Zaloguj się</Button>
          <Button onClick={SignInWithGoogle} className="btn-blue">
            Zaloguj się przy użyciu google
          </Button>
        </form>
      </div>
    );
  }
}
