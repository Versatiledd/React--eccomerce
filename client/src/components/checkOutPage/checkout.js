import React from "react";
import { Card, CardBody, Col, Badge, Table } from "reactstrap";
import { connect } from "react-redux";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import EmptyTrash from "../emptyTrash/emptyTrash";
import "./checkout.scss";
import StripeButton from "../stripe/stripe";
import { useDispatch } from "react-redux";

import NoImage from "../../shared/image/no-img.png";

const CheckOutPage = ({ cart }) => {
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  const clearItems = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({
      type: "CLEAR_CART_FROM_CHECKOUT",
      payload: [],
    });
  };
  const addQuantity = (e, _id) => {
    if (typeof window !== "undefined") {
      let cartLocalStorage;
      if (localStorage.getItem("cart")) {
        cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
      }
      cartLocalStorage.map((product, i) => {
        if (product._id == _id) {
          product.count += 1;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartLocalStorage));

      dispatch({
        type: "ADD_TO_CART",
        payload: cartLocalStorage,
      });
    }
  };

  const removeQuantity = (e, _id) => {
    if (typeof window !== "undefined") {
      let cartLocalStorage;
      if (localStorage.getItem("cart")) {
        cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
      }
      cartLocalStorage.map((product, i) => {
        if (product._id == _id) {
          if (product.count == 1) {
            return;
          } else {
            product.count -= 1;
          }
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: cartLocalStorage,
      });
    }
  };

  return (
    <div className="checkout-page">
      {cart.length ? (
        <>
          <div className="checkout-header">
            <div className="items">
              <span>Koszyk ({cart.length})</span>
              <div className="icon-items">
                <BsTrash className="trash" onClick={() => clearItems()} />
                <span>Wyczyść koszyk</span>
              </div>
            </div>
            <div className="items-wrapper">
              <div className="items-container">
                <Col
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <Card>
                    <CardBody
                      style={{
                        padding: 0,
                      }}
                    >
                      <Table
                        responsive
                        hover
                        className="table--bordered"
                        style={{
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        <thead>
                          <tr className="name-tr">
                            <th>Nazwa produktu</th>
                            <th>Zdjęcie</th>
                            <th>Ilość</th>
                            <th>Kolor</th>
                            <th>Dostawa</th>
                            <th>Opis</th>
                            <th>Cena</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map(
                            ({
                              _id,
                              title,
                              price,
                              description,
                              shipping,
                              color,
                              images,
                              count,
                            }) => (
                              <>
                                <tr>
                                  <th>{title}</th>
                                  <th
                                    className="img-container"
                                    style={{
                                      minWidth: "100px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        width: "80px",
                                        height: "80px",
                                      }}
                                    >
                                      {images.length > 0 ? (
                                        images.map((img) => {
                                          if (img.url) {
                                            return (
                                              <img
                                                src={img.url}
                                                alt=""
                                                style={{
                                                  height: "100%",
                                                  width: "100%",
                                                  margin: "0 10px",
                                                }}
                                              />
                                            );
                                          }
                                        })
                                      ) : (
                                        <img
                                          src={NoImage}
                                          alt=""
                                          style={{
                                            height: "100%",
                                            width: "100%",
                                            margin: "0 10px",
                                          }}
                                        />
                                      )}
                                    </div>
                                  </th>
                                  <th>
                                    <div
                                      className="quantity"
                                      style={{
                                        margin: "0",
                                        minWidth: "65px",
                                      }}
                                    >
                                      <AiOutlineArrowUp
                                        className="arrow"
                                        style={{
                                          fontSize: "18px",
                                          color: "#28a745",
                                          cursor: "pointer",
                                        }}
                                        onClick={(e) => addQuantity(e, _id)}
                                      />
                                      <span
                                        style={{
                                          margin: "0 5px",
                                        }}
                                      >
                                        {count}
                                      </span>
                                      <AiOutlineArrowDown
                                        className="arrow"
                                        style={{
                                          fontSize: "18px",
                                          color: "rgb(224 35 21)",
                                          cursor: "pointer",
                                        }}
                                        onClick={(e) => removeQuantity(e, _id)}
                                      />
                                    </div>
                                  </th>
                                  <th>Kolor</th>
                                  <th
                                    style={{
                                      color:
                                        shipping === "Tak"
                                          ? "green"
                                          : "#e85422",
                                    }}
                                  >
                                    {shipping}
                                  </th>
                                  <th>{description}</th>
                                  <th>{price} zł</th>
                                </tr>
                              </>
                            )
                          )}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </div>
            </div>{" "}
          </div>
        </>
      ) : null}

      {cart.length ? (
        <div className="container-checkout">
          <div className="wrapper-pay">
            <span className="total">Łączna kwota</span>
            <span className="total-price">{getTotal()} zł</span>
          </div>
          <div className="btn">
            <StripeButton items={cart} />
          </div>
        </div>
      ) : null}
      {cart.length === 0 && <EmptyTrash />}
    </div>
  );
};

const mapStateToProps = ({ cart }) => ({
  cart,
});
export default connect(mapStateToProps)(CheckOutPage);
