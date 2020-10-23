import React, { useState } from "react";
import FormInput from "../form-input/form-input";
import MainImg from "../images/main-img.webp";

import swal from "sweetalert";

import { auth } from "../../firebase/firebase";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

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

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import FormInput from "../form-input/form-input";
// import MainImg from "../images/main-img.webp";

// import { auth, SignInWithGoogle } from "../../firebase/firebase";

// export default class ResetPassword extends Component {
//   state = {
//     email: "",
//     password: "",
//     errorMessage: "",
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();

//     const { email, password } = this.state;
//     try {
//       await auth.signInWithEmailAndPassword(email, password);
//       this.setState({
//         email: "",
//         password: "",
//       });
//     } catch (error) {
//       this.setState(
//         {
//           errorMessage: error.message,
//         },
//         () => console.log(this.state.errorMessage)
//       );
//     }
//   };
//   handleChange = (e) => {
//     const { value, name } = e.target;

//     this.setState({ [name]: value });
//   };
//   render() {
//     const { errorMessage } = this.state;
//     return (
//       <div className="sign-in">
//         <div className="img-wrapper">
//           <img src={MainImg} alt="" className="login" />
//         </div>
//         <div className="form-wrapper">
//           <h3 className="title">Resetowanie hasła</h3>
//           <form action="" onSubmit={this.handleSubmit} className="form">
//             <label htmlFor="" className="label">
//               Email
//             </label>
//             <FormInput
//               name="email"
//               type="text"
//               value={this.state.email}
//               required
//               onChange={this.handleChange}
//             />
//             <label htmlFor="" className="label">
//               Hasło
//             </label>
//             <FormInput
//               name="password"
//               type="password"
//               value={this.state.password}
//               required
//               onChange={this.handleChange}
//             />
//             {errorMessage && <p className="error-msg">{errorMessage}</p>}
//             <div className="wrapper-btn">
//               <button type="submit" className="submit blue">
//                 <span className="login-btn">Zaloguj się</span>
//               </button>
//               <button onClick={SignInWithGoogle} className="submit red">
//                 <span className="login-btn-google">
//                   Zaloguj się przy użyciu google
//                 </span>
//               </button>
//               <button
//                 onClick={SignInWithGoogle}
//                 className="submit btn-password"
//               >
//                 <span className="login-btn-google">Zapomniałeś hasła?</span>
//               </button>
//               <span className="register">
//                 Nie posiadasz konta?{" "}
//                 <Link
//                   to="/rejestracja"
//                   style={{
//                     textDecoration: "none",
//                     cursor: "pointer",
//                     color: "#a6a6a6",
//                     fontWeight: 600,
//                   }}
//                 >
//                   Zarejestruj się!
//                 </Link>
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
