import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";

import { auth } from "../../firebase/firebase";
import swal from "sweetalert";

import "./history.scss";

const Password = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        swal(
          "Hasło zmienione!",
          "Możesz zalogować się do swojego konta nowym hasłem",
          "success"
        );
        setPassword("");
      })
      .catch((err) => {
        swal({
          title: "Zmiana hasła nieudana!",
          text: err.message,
          icon: "warning",
          dangerMode: true,
        });
      });
  };

  const updatePassword = () => (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Nowe hasło</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        name={password}
        placeholder="Wprowadź hasło"
      />
      <button disabled={!password || password.length < 6}>Wyślij</button>
    </form>
  );

  return (
    <div className="main-container">
      <UserNav />
      <div
        style={{
          minWidth: "80%",
        }}
      >
        <div className="form-wrapper">
          <h4>Resetuj hasło</h4>
          {updatePassword()}
        </div>
      </div>
    </div>
  );
};

export default Password;
