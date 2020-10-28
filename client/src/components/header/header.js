import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import gsap animation
import { TweenMax, Power2 } from "gsap";
// import icon
import { HiMenuAlt3 } from "react-icons/hi";
import { BiUser } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
// import routes
import Routes from "../navigation/routes";
// video
import { openMenu } from "../../redux/menu/menu.action";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logoutCurrentUser } from "../../redux/user/user-actions";

import "./header.styles.scss";

// import bigger menu

import Menu from "../biggerMenu/fullmenu";
import { auth } from "../../firebase/firebase";

const Header = ({
  isOpen,
  openMenu,
  currentUser,
  cartItems,
  itemCount,
  history,
  logoutCurrentUser,
}) => {
  const [showVideo, setCureentVideo] = useState({
    show: false,
    video: "video.mp4",
    id: null,
  });
  const [onHover, setHover] = useState(false);
  const [onHoverCart, setHoverCart] = useState(false);

  let layer = useRef(null);
  let ul = useRef(null);
  // let revealVideo = useRef(null);

  useEffect(() => {
    // menu
    if (isOpen) {
      TweenMax.to(layer, 0.4, { x: "100%" });
      TweenMax.to(ul, 1.5, { opacity: 1 });
    } else {
      TweenMax.to(layer, 0.4, { x: "0" });
    }
  }, [isOpen, onHover, onHoverCart, showVideo]);

  const logout = () => {
    auth.signOut();
    logoutCurrentUser(null);
  };

  return (
    <>
      <div className="layer" ref={(el) => (layer = el)}>
        <nav className="nav-wrapper">
          <ul className="ul-wrapper" ref={(el) => (ul = el)}>
            {Routes.map((route) => {
              return (
                <li
                  key={route.id}
                  className="item"
                  onClick={() => openMenu(false)}
                >
                  <Link
                    to={route.path}
                    className="single-link"
                    onMouseEnter={() =>
                      setCureentVideo({
                        show: true,
                        video: route.video,
                        id: route.id,
                      })
                    }
                    onMouseLeave={() =>
                      setCureentVideo({
                        show: false,
                        video: route.video,
                        id: route.id,
                      })
                    }
                  >
                    {route.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="video-container">
            <div
              className="reveal-video"
              // ref={(el) => (revealVideo = el)}
            ></div>
            <div className="video">
              <motion.video
                src={require(`../video/${showVideo.video}`)}
                loop
                autoPlay
                muted
                animate={{ opacity: showVideo.show ? 1 : 0 }}
                transition={{
                  duration: showVideo.show ? 0.9 : 0.1,
                }}
              ></motion.video>
            </div>
          </div>
        </nav>
      </div>

      <div className="header">
        <div className="wrapper-header">
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
            className="link-header"
          >
            <div className="logo-name">
              <span className="small-title">deco</span>
              <span className="big-title">Home</span>
            </div>
          </Link>

          <div className="wrapper-pallete">
            <div className="collor-pallete">
              <div className="wrapper-circle">
                <div className="circle white"></div>
                <div className="circle gray"></div>
                <div className="circle green"></div>
              </div>
            </div>
            <span className="name">Color Palette</span>
          </div>

          {history.location.pathname === "/logowanie" ||
          history.location.pathname === "/rejestracja" ||
          history.location.pathname === "/resetowanie" ? null : (
            <>
              {" "}
              <div className="wrapper-items">
                <div
                  className="user-login"
                  onMouseEnter={() => setHover(!onHover)}
                  onMouseLeave={() => setHover(false)}
                >
                  <div className="user-icon">
                    <BiUser />
                  </div>
                  {currentUser ? (
                    <span className="user-account">
                      Witaj, {currentUser.name}
                    </span>
                  ) : (
                    <>
                      <span className="user-account">Twoje konto</span>{" "}
                    </>
                  )}

                  <motion.div
                    className={onHover ? "hover-wrapper" : "off"}
                    animate={{ opacity: onHover ? 1 : 0 }}
                    transition={{
                      duration: onHover && 0.4,
                    }}
                    style={{
                      padding: "20px",
                    }}
                  >
                    <div className="container-login">
                      <div className="btn-wrapper">
                        {currentUser && currentUser.role === "admin" && (
                          <>
                            <Link to="/admin/dashboard">
                              <button
                                className="login-btn"
                                style={{
                                  margin: "10px 0",
                                }}
                              >
                                Panel admina
                              </button>
                            </Link>
                            <Link to="/">
                              <button
                                className="login-btn"
                                onClick={() => logout()}
                              >
                                Wyloguj się
                              </button>
                            </Link>{" "}
                          </>
                        )}
                        {currentUser && currentUser.role === "subscriber" && (
                          <>
                            <Link to="/user/history">
                              <button
                                className="login-btn"
                                style={{
                                  margin: "10px 0",
                                }}
                              >
                                Panel użytkownika
                              </button>
                            </Link>
                            <Link to="/">
                              <button
                                className="login-btn"
                                onClick={() => logout()}
                              >
                                Wyloguj się
                              </button>
                            </Link>{" "}
                          </>
                        )}
                        {!currentUser && (
                          <>
                            <Link to="/logowanie">
                              <button className="login-btn">Zaloguj się</button>
                            </Link>
                            <span className="no-account">Nie masz konta?</span>
                            <Link to="/rejestracja">
                              <button className="register-btn">
                                Załóż konto
                              </button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div
                  className="user-login"
                  onMouseEnter={() => setHoverCart(!onHoverCart)}
                  onMouseLeave={() => setHoverCart(false)}
                >
                  <span className="ammount-item">{itemCount}</span>
                  <div className="user-icon">
                    <TiShoppingCart />
                  </div>
                  <span className="user-account">Koszyk</span>
                  <motion.div
                    className={onHoverCart ? "hover-wrapper" : "off"}
                    animate={{ opacity: onHoverCart ? 1 : 0 }}
                    transition={{
                      duration: onHoverCart && 0.4,
                    }}
                  >
                    {cartItems.length > 0 ? (
                      <span className="cart-title">Koszyk ({itemCount})</span>
                    ) : null}

                    {cartItems.length > 0 ? (
                      cartItems.map((item) => {
                        return (
                          <div className="cart-item" key={item.id}>
                            <div className="cart-description">
                              <div className="container-desription">
                                <img src={item.imageUrl} alt="" />
                              </div>
                              <div className="item-title">{item.name}</div>
                              <div className="item-price">{item.price}</div>
                            </div>
                            <div className="checkout-cart">
                              <div className="container-checkout">
                                <span className="price-checkout">
                                  Do zapłaty
                                </span>
                                <span className="price-checkout">
                                  {item.price} zł
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="container-cart">
                        <div className="btn-wrapper">
                          <h3 className="title-cart">Twój koszyk jest pusty</h3>
                        </div>
                      </div>
                    )}
                    {cartItems.length > 0 ? (
                      <div className="btn-wra">
                        <button
                          className="btn-checkout"
                          onClick={() => history.push("/checkout")}
                        >
                          Przejdź do płatności
                        </button>
                      </div>
                    ) : null}
                  </motion.div>
                </div>
              </div>
            </>
          )}

          <div className="wrapper-login">
            <div className="menu" onClick={() => openMenu(!isOpen)}>
              <HiMenuAlt3 />
            </div>
          </div>
        </div>
      </div>
      {history.location.pathname === "/logowanie" ||
      history.location.pathname === "/rejestracja" ||
      history.location.pathname === "/resetowanie" ? null : (
        <Menu />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openMenu: (menu) => dispatch(openMenu(menu)),
  logoutCurrentUser: (user) => dispatch(logoutCurrentUser(user)),
});

const mapStateToProps = ({
  cart: { cartItems },
  user: { currentUser },
  menu: { isOpen },
}) => ({
  currentUser,
  isOpen,
  cartItems,
  itemCount: cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null)(Header)
);
