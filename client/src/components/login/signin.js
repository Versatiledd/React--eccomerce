import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormInput from "../form-input/form-input";
import MainImg from "../images/main-img.webp";
import "./signIn.styles.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import setCurrentUser from "../../redux/user/user-actions";

import { auth, provider } from "../../firebase/firebase";
import { createOrUpdateUser } from "../../functions/auth";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };

  roleBasedRedirect = (res) => {
    const { history } = this.props;
    let intended = history.location;
    console.log(intended.state.from);
    if (intended) {
      history.push(intended.state.from);
    } else {
      if (res.data.role === "admin") {
        history.push("admin/dashboard");
      } else {
        history.push("user/history");
      }
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    try {
      let result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenUser = await user.getIdTokenResult();

      createOrUpdateUser(idTokenUser.token)
        .then((res) => {
          this.setState({
            email: "",
            password: "",
          });
          this.props.setCurrentUser({
            name: res.data.name,
            email: res.data.email,
            token: idTokenUser.token,
            role: res.data.role,
            _id: res.data._id,
          });
          this.roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }
  };
  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  async googleLogin(setCurrentUser) {
    const { history } = this.props;
    console.log(setCurrentUser);
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const { user } = result;
        const idTokenUser = await user.getIdTokenResult();

        createOrUpdateUser(idTokenUser.token)
          .then((res) => {
            setCurrentUser({
              name: res.data.name,
              email: res.data.email,
              token: idTokenUser.token,
              role: res.data.role,
              _id: res.data._id,
            });
            this.roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { errorMessage } = this.state;
    const { setCurrentUser } = this.props;
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
              <button
                onClick={() => this.googleLogin(setCurrentUser)}
                className="submit red"
              >
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(Signin));
