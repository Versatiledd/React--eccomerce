import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Badge, Table } from "reactstrap";
import {
  getProducts,
  deleteProduct,
  getProduct,
} from "../../../../functions/product";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getValueFromSingleProduct } from "../../../../redux/formValue/formValue.actions";

import "./productList.scss";

export const ProductList = ({ getValueFromSingleProduct }) => {
  const [products, setProducts] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { slug } = useParams();
  const history = useHistory();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProducts(15).then((res) => setProducts(res.data));
  };

  const handleRemove = (slug) => {
    deleteProduct(slug, currentUser.token)
      .then(() => loadProducts())
      .catch((err) => console.log(err));
  };

  const getSingleProduct = (slug) => {
    getProduct(slug)
      .then((res) => {
        getValueFromSingleProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Lista Produktów</h5>
          </div>
          <Table responsive hover className="table--bordered">
            <thead>
              <tr className="name-tr">
                <th>Nazwa produktu</th>
                <th>Zdjęcie</th>
                <th>Ilość</th>
                <th>Kolor</th>
                <th>Kategoria</th>
                <th>Podkategoria</th>
                <th>Dostawa</th>
                {/* <th>Opis</th> */}
                <th>Cena</th>
                <th>Usuń produkt</th>
                <th>Edytuj produkt</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map(
                  (
                    {
                      title,
                      description,
                      price,
                      quantity,
                      shipping,
                      slug,
                      category,
                      subcategory,
                      images,
                    },
                    id
                  ) => {
                    return (
                      <tr key={id}>
                        <th>{title}</th>
                        <th
                          className="img-container"
                          style={{
                            minWidth: "200px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "80px",
                              height: "80px",
                            }}
                          >
                            {images.length > 0 &&
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
                              })}
                          </div>
                        </th>
                        <th>{quantity}</th>
                        <th>Kolor</th>
                        <th>{category}</th>
                        <th>{subcategory}</th>
                        <th
                          style={{
                            color: shipping === "Tak" ? "green" : "#e85422",
                          }}
                        >
                          {shipping}
                        </th>
                        {/* <th>{description.substring(0, 180)}</th> */}
                        <th>{price}</th>
                        <th>
                          <Badge
                            className="bd-progress"
                            style={{
                              backgroundColor: "#F44336",
                              cursor: "pointer",
                            }}
                            onClick={() => handleRemove(slug)}
                          >
                            Delete
                          </Badge>
                        </th>
                        <th>
                          <Link to={`/admin/product/${slug}`}>
                            <Badge
                              className="bd-progress"
                              style={{
                                backgroundColor: "#4CAF50",
                                cursor: "pointer",
                              }}
                              onClick={() => getSingleProduct(slug)}
                            >
                              Edytuj produkt
                            </Badge>
                          </Link>
                        </th>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getValueFromSingleProduct: (value) =>
    dispatch(getValueFromSingleProduct(value)),
});

export default connect(null, mapDispatchToProps)(ProductList);
