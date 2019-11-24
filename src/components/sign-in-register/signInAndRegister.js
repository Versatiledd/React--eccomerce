import React from "react";
import "./signInAndRegister.style.scss";
import SignIn from "../signComponents/signin";
import SignUp from "../sign-up/sign-up";
const SignInAndSignUp = () => {
  return (
    <div className="signInAndSignUp">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSignUp;
