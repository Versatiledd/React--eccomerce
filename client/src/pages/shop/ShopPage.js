import React, { useEffect, useState } from "react";
import "./shop.scss";

import { getProducts } from "../../functions/product";
import SingleProduct from "../../components/singleProduct/singleProduct";

// components
import CollectionOverviev from "../../components/collection-overview/collection-overviev";
import Category from "../../components/categoryPage/category";
// import firestore

export const ShopPage = () => {
  const [products, setProducts] = useState("");

  console.log(products);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProducts(20)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="wrapper-shop">
      <div className="left-wrapper">
        <p className="filter-text">Filtry</p>
        <div className="producents">
          <p className="producent-text">Producenci</p>
          <div className="single-prod">
            <input type="checkbox" />
            <span>Dell</span>
          </div>
          <div className="single-prod">
            <input type="checkbox" />
            <span>Velcx</span>
          </div>
          <div className="single-prod">
            <input type="checkbox" />
            <span>Simpl</span>
          </div>
          <div className="single-prod">
            <input type="checkbox" />
            <span>Xdrive</span>
          </div>
          <div className="single-prod">
            <input type="checkbox" />
            <span>Yol</span>
          </div>
        </div>
        <div className="price">
          <p className="price-text">Cena</p>
          <div className="wrapper-price">
            <input type="number" className="price-input" placeholder="od" />
            <span className="minus">-</span>
            <input type="number" className="price-input" placeholder="do" />
          </div>
        </div>
      </div>
      <div className="right-wrapper">
        {products.length > 0 &&
          products.map((product) => {
            return <SingleProduct key={product._id} product={product} />;
          })}
      </div>
    </div>
  );
};

export default ShopPage;
