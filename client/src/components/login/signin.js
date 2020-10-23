import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormInput from "../form-input/form-input";
import MainImg from "../images/main-img.webp";
import "./signIn.styles.scss";

import { auth, SignInWithGoogle } from "../../firebase/firebase";

export default class Signin extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: "",
      });
    } catch (error) {
      this.setState(
        {
          errorMessage: error.message,
        },
        () => console.log(this.state.errorMessage)
      );
    }
  };
  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };
  render() {
    const { errorMessage } = this.state;
    return (
      <div className="sign-in">
        <div className="img-wrapper">
          <img src={MainImg} alt="" className="login" />
        </div>
        <div className="form-wrapper">
          <h3 className="title">Login</h3>
          <form action="" onSubmit={this.handleSubmit} className="form">
            <label htmlFor="" className="label">
              Email
            </label>
            <FormInput
              name="email"
              type="text"
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
            {errorMessage && <p className="error-msg">{errorMessage}</p>}
            <div className="wrapper-btn">
              <button type="submit" className="submit blue">
                <span className="login-btn">Zaloguj się</span>
              </button>
              <button onClick={SignInWithGoogle} className="submit red">
                <span className="login-btn-google">
                  Zaloguj się przy użyciu google
                </span>
              </button>
              <Link to="/resetowanie">
                <button className="submit btn-password">
                  <span className="login-btn-google">Zapomniałeś hasła?</span>
                </button>
              </Link>

              <span className="register">
                Nie posiadasz konta?{" "}
                <Link
                  to="/rejestracja"
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#a6a6a6",
                    fontWeight: 600,
                  }}
                >
                  Zarejestruj się!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
