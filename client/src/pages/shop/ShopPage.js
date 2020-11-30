import React, { useEffect, useState } from "react";
import "./shop.scss";
import { Pagination, Menu, Slider, Checkbox } from "antd";
import {
  getTotalProducts,
  getProductsWithPagination,
  fetchProductsByFilter,
} from "../../functions/product";
import { getCategories } from "../../functions/category";
import { useSelector, useDispatch } from "react-redux";
import SingleProduct from "../../components/singleProduct/singleProduct";

import "antd/dist/antd.css";

export const ShopPage = () => {
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOkay] = useState(false);
  const [products, setProducts] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoriesIds] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();

  useEffect(() => {
    loadProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
  }, [page]);

  useEffect(() => {
    getTotal();
  }, []);
  // ładowanie produktów defaultowo w momencie wejścia na /shop
  const loadProducts = () => {
    getProductsWithPagination("createdAt", "desc", page)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  // 1. Ładowanie produktów w zależności od szukanej frazy
  const fetchProducts = (text) => {
    fetchProductsByFilter(text).then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const getTotal = () => {
    getTotalProducts()
      .then((res) => setTotalProducts(res.data))
      .catch((err) => console.log(err));
  };

  // 2. Załaduj produkty w momencie zmian ceny && wyślij zapytanie do serwera

  useEffect(() => {
    console.log("ok to req, ładuje za pierwszym razem");
    if (price[0] === 0 && price[1] === 0) {
      loadProducts();
    } else {
      fetchProducts({ price });
    }
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoriesIds([]);
    setPrice(value);
    setTimeout(() => {
      setOkay(!ok);
    }, 600);
  };

  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    let inTheState = [...categoryIds];
    let checked = e.target.value;
    let foundInTheState = inTheState.indexOf(checked);

    if (foundInTheState === -1) {
      inTheState.push(checked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoriesIds(inTheState);

    // pobierz produkty na podstawie zaznaczonej kategorii

    fetchProducts({ category: inTheState });
  };

  const showCategories = () =>
    categories.length > 0 &&
    categories.map((c) => {
      return (
        <div className="cat" key={c._id}>
          <Checkbox
            value={c._id}
            name="category"
            style={{
              margin: "10px 0",
            }}
            onChange={handleCheck}
            checked={categoryIds.includes(c._id)}
          >
            {c.name}
          </Checkbox>
        </div>
      );
    });
  return (
    <>
      <div className="main-container">
        <div className="left-wrapper">
          <p className="filter-text">Filtry</p>
          <Menu mode="inline" defaultOpenKeys={["1", "2"]}>
            {/* Price */}
            <Menu.SubMenu key="1" title={"Cena"}>
              <div className="price-range">
                <Slider
                  tipFormatter={(v) => `${v} zł`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="5000"
                />
              </div>
            </Menu.SubMenu>
            {/* categories */}
            <Menu.SubMenu key="2" title={"Kategorie"}>
              <div className="category">{showCategories()}</div>
            </Menu.SubMenu>
          </Menu>
        </div>
        <div className="wrapper-shop">
          <div className="right-wrapper">
            {products.length > 0 &&
              products.map((product) => {
                return <SingleProduct key={product._id} product={product} />;
              })}
          </div>
          <div className="pagination-wrapper">
            <Pagination
              current={page}
              total={(totalProducts / 4) * 10}
              onChange={(value) => setPage(value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
