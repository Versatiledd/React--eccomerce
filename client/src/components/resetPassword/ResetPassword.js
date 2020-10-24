import React, { useState, useEffect } from "react";
import FormInput from "../form-input/form-input";
import MainImg from "../images/main-img.webp";

import swal from "sweetalert";

import { auth } from "../../firebase/firebase";
import { useSelector } from "react-redux";

export default function ResetPassword({ history }) {
  const [email, setEmail] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);

  useEffect(() => {
    if (currentUser) history.push("/dashboard");
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_RESET_PASSWORD,
      handleCodeInApp: true,
    };

    console.log(config);

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        swal(
          "Sprawdź pocztę",
          "Na Twojego email został wysłany link resetujący hasło",
          "success"
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="sign-in">
      <div className="img-wrapper">
        <img src={MainImg} alt="" className="login" />
      </div>
      <div className="form-wrapper">
        <h3 className="title">Resetowanie hasła</h3>
        <form action="" onSubmit={handleSubmit} className="form">
          <label htmlFor="" className="label">
            Podaj email na który wyślemy link resetujący hasło
          </label>
          <FormInput
            name="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="wrapper-btn">
            <button type="submit" className="submit btn-password">
              <span className="login-btn-google">Resetuj hasło</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
