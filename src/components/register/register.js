import React, { Component } from "react";
import RegisterImg from "../images/register-img.webp";
import { Link } from "react-router-dom";
import FormInput from "../form-input/form-input";

import { auth, createUserProfileDocument } from "../../firebase/firebase";

export default class Register extends Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password, confirmPassword, displayName } = this.state;

    if (password !== confirmPassword) {
      alert("Wpisane hasło nie jest identyczne!");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({ [name]: value }, () => console.log(this.state));
  };
  render() {
    return (
      <div className="sign-in">
        <div className="form-wrapper">
          <h3 className="title">Rejestracja</h3>
          <form action="" onSubmit={this.handleSubmit} className="form">
            <label htmlFor="" className="label">
              Nick
            </label>
            <FormInput
              name="displayName"
              type="text"
              value={this.state.displayName}
              required
              onChange={this.handleChange}
            />
            <label htmlFor="" className="label">
              Email
            </label>
            <FormInput
              name="email"
              type="email"
              value={this.state.email}
              required
              onChange={this.handleChange}
            />
            <label htmlFor="" className="label">
              Hasło
            </label>
            <FormInput
              name="password"
              type="password"
              value={this.state.password}
              required
              onChange={this.handleChange}
            />
            <label htmlFor="" className="label">
              Powtórz hasło
            </label>
            <FormInput
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              required
              onChange={this.handleChange}
            />
            <div className="wrapper-btn">
              <button type="submit" className="submit red">
                <span className="login-btn">Zarejestruj konto</span>
              </button>
              <span className="register">
                Posiadasz konto?
                <Link
                  to="/logowanie"
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#a6a6a6",
                    fontWeight: 600,
                    marginLeft: "5px",
                  }}
                >
                  Zaloguj się!
                </Link>
              </span>
            </div>
          </form>
        </div>
        <div className="img-wrapper">
          <img src={RegisterImg} alt="" className="login" />
        </div>
      </div>
    );
  }
}
