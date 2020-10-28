import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import HomePage from "./pages/Homepage";
import ShopPage from "./pages/shop/ShopPage";
import History from "./pages/user/History";
import Header from "./components/header/header";
import CheckOutPage from "./components/checkOutPage/checkout";
import Register from "./components/register/register";
import Dashboard from "./components/dashboard/dashboard";
import ResetPassword from "./components/resetPassword/ResetPassword";
//

// pages
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import Orders from "./pages/user/Orders";
import AdminDashboard from "./pages/admin/AdminDashboard";

// category
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";

// firebase
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments,
} from "./firebase/firebase";
//

// actions
import setCurrentUser from "../src/redux/user/user-actions";
import SignInAndSignUp from "./components/sign-in-register/signInAndRegister";
//
import { getCurrentUser } from "./functions/auth";
//
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

const App = ({ setCurrentUser, currentUser }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const tokenUser = await user.getIdTokenResult();

        getCurrentUser(tokenUser.token)
          .then((res) => {
            setCurrentUser({
              name: res.data.name,
              email: res.data.email,
              token: tokenUser.token,
              role: res.data.role,
              _id: res.data._id,
            });
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, []);
  // unsubscribeFromAuth = null;

  // componentDidMount() {
  //   console.log("wołam");
  //   const { setCurrentUser, currentUser } = this.props;

  //   console.log(currentUser);

  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const useRef = await createUserProfileDocument(userAuth);

  //       const tokenUser = await userAuth.getIdTokenResult();

  //       setCurrentUser({
  //         email: userAuth.email,
  //         tokenUser: tokenUser.token,
  //       });
  //     }
  //     setCurrentUser(userAuth);
  // dodanie do bazy danych produktów

  // addCollectionAndDocuments(
  //   "collections",
  //   collectionsArray.map(({ title, items }) => ({ title, items }))
  // );
  //   });
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckOutPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/logowanie" component={SignInAndSignUp} />
        <Route path="/rejestracja" component={Register} />
        <Route path="/resetowanie" component={ResetPassword} />
        <UserRoute path="/user/history" component={History} />
        <UserRoute path="/user/password" component={Password} />
        <UserRoute path="/user/wishlist" component={Wishlist} />
        <UserRoute path="/user/orders" component={Orders} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute path="/admin/kategorie" exact component={CategoryCreate} />
        <AdminRoute path="/admin/kategorie/:slug" component={CategoryUpdate} />
      </Switch>
    </>
  );
};

const mapStateToProps = ({ user: { currentUser }, shop: { collections } }) => ({
  currentUser,
  collectionsArray: collections,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
