import React, { useState, useEffect } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductTabs";
import {
  getProduct,
  productStar,
  getRelatedProducts,
} from "../../../functions/product";
import { addToWishlist } from "../../../functions/User";
import StarRating from "react-star-ratings";
import Modal from "react-modal";
import swal from "sweetalert";

import averageRating from "../../../functions/rating";
import RelatedItems from "./RelatedItems";
import _ from "lodash";

import "./productPage.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "250px",
    width: "400px",
    borderRadius: "3%",
  },
};

const ProductCard = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelated] = useState("");
  const [star, setStar] = useState(0);
  const [visible, setVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    singleProduct();
  }, [slug]);

  const handleWishlist = (e) => {
    e.preventDefault();

    addToWishlist(product._id, currentUser.token).then((res) => {
      swal({
        title: "Produkt dodany",
        icon: "success",
        button: "Okay",
      });
      history.push("/user/wishlist");
    });
  };

  // useEffect(() => {
  //   if (product.ratings && currentUser) {
  //     let existingRatingObject = product.ratings.find(
  //       (el) => el.postedBy == currentUser._id
  //     );
  //     existingRatingObject && setStar(existingRatingObject.star);
  //   }
  // });

  const singleProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
        // get related product
        getRelatedProducts(res.data._id).then((res) => setRelated(res.data));
      })
      .catch((err) => console.log(err));
  };

  const onStarClicked = (star, nameID) => {
    setStar(star);
    productStar(nameID, star, currentUser.token).then((res) => {
      singleProduct();
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (currentUser) {
      setVisible(true);
    } else {
      swal({
        text: "Aby zostawić ocenę musisz się zalogować.",
        icon: "warning",
        dangerMode: true,
      }).then(() => {
        history.push({
          pathname: "/logowanie",
          state: { from: `/product/${slug}` },
        });
      });
    }
  };

  const addToCart = (e, product) => {
    e.preventDefault();
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem("cart", JSON.stringify(unique));

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="product-card">
            <ProductGallery images={product.images} />
            <div className="product-card__info">
              <h3 className="product-card__title">{product.title}</h3>
              <div className="product-card__rate">
                {product && product.ratings && product.ratings.length > 0 ? (
                  averageRating(product)
                ) : (
                  <span>Brak ocen</span>
                )}
                <a className="product-card__link">
                  ({product.ratings && product.ratings.length})
                </a>
              </div>
              <h1 className="product-card__price">
                <span className="product-card__old-price">
                  {product.price} zł
                </span>
              </h1>
              {/* <p className="typography-message"></p> */}
              <form className="form product-card__form">
                {/* <div className="form__form-group"> */}
                {/* <span className="form__form-group-label product-card__form-label">
                    Select Color
                  </span> */}
                {/* <div className="form__form-group-field"> */}
                {/* <ColorSelect
                      options={[
                        {
                          value: "Pink Sugar",
                          label: "Pink Sugar",
                          color: "#f7a9c4",
                        },
                        {
                          value: "Pink Sugar",
                          label: "Pink Sugar",
                          color: "#f7a9c4",
                        },
                        {
                          value: "Pink Sugar",
                          label: "Pink Sugar",
                          color: "#f7a9c4",
                        },
                      ]}
                    /> */}
                {/* </div> */}
                {/* </div> */}
                <div className="btns">
                  <button
                    className="btn-checkout"
                    onClick={(e) => addToCart(e, product)}
                    disabled={product.quantity === 0 ? true : false}
                  >
                    {product.quantity === 0
                      ? "Produkt wyprzedany"
                      : " Dodaj do karty"}
                  </button>
                  <button
                    className="btn-wish"
                    type="button"
                    onClick={handleWishlist}
                  >
                    Dodaj do listy życzeń
                  </button>
                  <button className="btn-star" onClick={(e) => handleClick(e)}>
                    Oceń produkt
                  </button>
                </div>
              </form>
              <Modal
                isOpen={visible}
                style={customStyles}
                onRequestClose={() => setVisible(false)}
                ariaHideApp={false}
              >
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4>Oceń produkt</h4>
                  <StarRating
                    name={product._id}
                    numberOfStars={5}
                    rating={star}
                    changeRating={onStarClicked}
                    isSelectable
                    starRatedColor="darkgoldenrod"
                    starHoverColor="#daaa19"
                    starDimension="25px"
                  />
                  <button
                    onClick={() => setVisible(false)}
                    style={{
                      backgroundColor: "#f44336",
                      cursor: "pointer",
                      textDecoration: "none",
                      outline: "none",
                      border: "none",
                      padding: "6px",
                      borderRadius: "10px",
                      color: "white",
                      fontSize: "14px",
                      width: "150px",
                    }}
                  >
                    Analuj
                  </button>
                  <button
                    onClick={() => setVisible(false)}
                    style={{
                      backgroundColor: "#1383fb",
                      cursor: "pointer",
                      textDecoration: "none",
                      outline: "none",
                      border: "none",
                      padding: "6px",
                      borderRadius: "10px",
                      color: "white",
                      fontSize: "14px",
                      width: "150px",
                    }}
                  >
                    Dodaj
                  </button>
                </div>
              </Modal>
              <ProductTabs product={product} />
            </div>
          </div>
          <RelatedItems products={relatedProducts} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductCard;
