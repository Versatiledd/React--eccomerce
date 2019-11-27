import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/header";
import { auth, UserProfileDocument } from "./firebase/firebase";
import { connect } from "react-redux";
import setCurrentUser from "../src/redux/user/user-actions";
import SignInAndSignUp from "./components/sign-in-register/signInAndRegister";
import checkOutPage from "./components/checkOutPage/checkOutPage";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await UserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }
      setCurrentUser(userAuth);
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
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" exact component={checkOutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
