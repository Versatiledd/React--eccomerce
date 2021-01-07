import React, { useEffect } from "react";

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
import ResetPassword from "./components/resetPassword/ResetPassword";
//

// pages
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import Orders from "./pages/user/Orders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCreateProduct from "./pages/admin/AdminCreateProduct";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUpdateProduct from "./pages/admin/AdminUpdateProduct";
import ProductPage from "./pages/ProductPage/index";

// category
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
// sub category
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";

// firebase
import { auth } from "./firebase/firebase";
//

// actions
import setCurrentUser from "../src/redux/user/user-actions";
import SignInAndSignUp from "./components/sign-in-register/signInAndRegister";
//
import { getCurrentUser } from "./functions/auth";
//
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AuthRoute from "./components/routes/AuthRoute";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import CookieConsent from "react-cookie-consent";

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

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckOutPage} />
        <AuthRoute path="/logowanie" component={SignInAndSignUp} />
        <AuthRoute path="/rejestracja" component={Register} />
        <AuthRoute path="/resetowanie" component={ResetPassword} />
        <Route path="/product/:slug" exact component={ProductPage} />
        <UserRoute path="/user/history" component={History} />
        <UserRoute path="/user/password" component={Password} />
        <UserRoute path="/user/wishlist" component={Wishlist} />
        <UserRoute path="/user/orders" component={Orders} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute path="/admin/kategorie" exact component={CategoryCreate} />
        <AdminRoute path="/admin/kategorie/:slug" component={CategoryUpdate} />
        <AdminRoute path="/admin/sub" exact component={SubCreate} />
        <AdminRoute path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute
          path="/admin/product"
          exact
          component={AdminCreateProduct}
        />
        <AdminRoute path="/admin/products" exact component={AdminProducts} />
        <AdminRoute
          path="/admin/product/:slug"
          exact
          component={AdminUpdateProduct}
        />
      </Switch>
      <CookieConsent
        location="bottom"
        buttonText="Rozumiem"
        cookieName="Wiadomość"
        style={{ background: "#252525", height: "150px" }}
        buttonStyle={{ color: "#4e503b", fontSize: "12px" }}
        expires={150}
      >
        <div>
          <p
            style={{
              fontFamily: "Roboto",
            }}
          >
            Witaj, zanim przejdziesz do testowania aplikacji chciałbym
            zaznaczyć, że nie jest ona doskonała i jestem tego świadomy.
            Zapraszam do przeczytania opisu na githubie.
          </p>
          <div>
            <p
              style={{
                color: "#4caf50",
              }}
            >
              Nick/Email : admin@gmail.com
            </p>
            <p
              style={{
                color: "#4caf50",
              }}
            >
              Hasło : admin1234
            </p>
          </div>
        </div>
      </CookieConsent>
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
