import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/header";
import ResetPassword from "./components/resetPassword/ResetPassword";
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments,
} from "./firebase/firebase";
import { connect } from "react-redux";
import setCurrentUser from "../src/redux/user/user-actions";
import SignInAndSignUp from "./components/sign-in-register/signInAndRegister";
import CheckOutPage from "./components/checkOutPage/checkout";
import Register from "./components/register/register";
import Dashboard from "./components/dashboard/dashboard";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const useRef = await createUserProfileDocument(userAuth);

        const tokenUser = await userAuth.getIdTokenResult();

        useRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            tokenUser: tokenUser.token,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
      // dodanie do bazy danych produktów

      // addCollectionAndDocuments(
      //   "collections",
      //   collectionsArray.map(({ title, items }) => ({ title, items }))
      // );
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" exact component={CheckOutPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route
            path="/logowanie"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/dashboard" />
              ) : (
                <SignInAndSignUp />
              )
            }
          />
          <Route path="/rejestracja" component={Register} />
          <Route path="/resetowanie" component={ResetPassword} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ user: { currentUser }, shop: { collections } }) => ({
  currentUser,
  // collectionsArray: collections,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
