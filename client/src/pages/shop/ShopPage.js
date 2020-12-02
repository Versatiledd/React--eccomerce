import React, { useEffect, useState } from "react";
import "./shop.scss";
import { Pagination, Menu, Slider, Checkbox, Radio } from "antd";
import {
  getTotalProducts,
  getProductsWithPagination,
  fetchProductsByFilter,
} from "../../functions/product";
import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import SingleProduct from "../../components/singleProduct/singleProduct";
import Star from "../../components/star/Star";

import "antd/dist/antd.css";

export const ShopPage = () => {
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOkay] = useState(false);
  const [products, setProducts] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoriesIds] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [page, setPage] = useState(1);
  const [brands, setBrands] = useState(["Lenovo", "Asus", "Apple", "Samsung"]);
  const [brand, setBrand] = useState("");
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();

  console.log(products);

  useEffect(() => {
    loadProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
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
    setStar("");
    setSub([]);
    setBrand("");
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
    setStar("");
    setSub("");
    setBrand("");
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

  const handleStarClick = (number) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesIds([]);
    setSub([]);
    setStar(number);
    setBrand("");
    fetchProducts({ stars: number });
  };
  const showRatings = () => (
    <>
      <div className="rating">
        <Star starClick={handleStarClick} numberOfStars={5} />{" "}
      </div>
      <div className="rating">
        <Star starClick={handleStarClick} numberOfStars={4} />{" "}
      </div>
      <div className="rating">
        <Star starClick={handleStarClick} numberOfStars={3} />{" "}
      </div>
      <div className="rating">
        <Star starClick={handleStarClick} numberOfStars={2} />{" "}
      </div>
      <div className="rating">
        <Star starClick={handleStarClick} numberOfStars={1} />{" "}
      </div>
    </>
  );

  const handleSub = (sub) => {
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesIds([]);
    setStar("");
    setBrand("");
    fetchProducts({ sub });
  };

  const showSubCategory = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="badge badge-secondary"
        style={{
          display: "flex",
          alignItems: "center",
          width: "70px",
          cursor: "pointer",
          margin: "5px",
          height: "20px",
          fontSize: "12px",
        }}
      >
        {s.name}
      </div>
    ));

  const handleBrand = (e) => {
    console.log(e.target.value);
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesIds([]);
    setStar("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () =>
    brands.map((b) => (
      <>
        <div
          className="radio-brand"
          style={{
            margin: "15px 0",
          }}
        >
          <Radio
            value={b}
            name={b}
            checked={b === brand}
            onChange={(e) => handleBrand(e)}
          >
            {b}
          </Radio>
        </div>
      </>
    ));

  return (
    <>
      <div className="main-container">
        <div className="left-wrapper">
          <p className="filter-text">Filtry</p>
          <Menu
            mode="inline"
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
          >
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
            <Menu.SubMenu key="3" title={"Rating"}>
              {showRatings()}
            </Menu.SubMenu>
            <Menu.SubMenu key="4" title={"Podkategorie"}>
              {showSubCategory()}
            </Menu.SubMenu>
            <Menu.SubMenu key="5" title={"Marka"}>
              {showBrands()}
            </Menu.SubMenu>
          </Menu>
        </div>
        <div className="wrapper-shop">
          {products.length === 0 ? (
            <p>Nie znaleziono produktu</p>
          ) : (
            <>
              {" "}
              <div className="right-wrapper">
                {products.length > 0 &&
                  products.map((product) => {
                    return (
                      <SingleProduct key={product._id} product={product} />
                    );
                  })}
              </div>
              <div className="pagination-wrapper">
                <Pagination
                  current={page}
                  total={(totalProducts / 4) * 10}
                  onChange={(value) => setPage(value)}
                />
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
