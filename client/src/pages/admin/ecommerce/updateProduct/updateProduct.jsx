import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
// import "../../../../../scss/admin/eccomerce-forms/createForm.scss";
import renderDropZoneMultipleField from "../../../../forms/DropZoneMultiple";
import { getProduct, updateProduct } from "../../../../functions/product";
import { useSelector } from "react-redux";

import { connect } from "react-redux";
import { getCategories, getCategorySubs } from "../../../../functions/category";
import { getValueFromSingleProduct } from "../../../../redux/formValue/formValue.actions";
import { useParams, useHistory } from "react-router-dom";

const ProductCreateForm = ({
  handleSubmit,
  reset,
  getValueFromSingleProduct,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const { slug } = useParams();
  const history = useHistory();

  console.log(subcategories);

  useEffect(() => {
    getSingleProduct();
    loadCategories();
  }, []);

  const getSingleProduct = () => {
    getProduct(slug)
      .then((res) => {
        console.log(res.data);
        getValueFromSingleProduct(res.data);
        getCategorySubs(res.data.category).then((s) =>
          setSubCategories(s.data)
        );
      })
      .catch((err) => console.log(err));
  };

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateDataFromProduct = (values) => {
    console.log(values);
    updateProduct(values.slug, values, currentUser.token)
      .then((res) => {
        history.push("/admin/products");
        reset();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    // e.preventDefault();
    getCategorySubs(e.target.value)
      .then((res) => {
        setSubCategories(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form
        className="form__create"
        onSubmit={handleSubmit((values) => updateDataFromProduct(values))}
      >
        <div className="form__half">
          <div className="form__form-group">
            <span className="form__form-group-label">Nazwa produktu</span>
            <div className="form__form-group-field">
              <Field
                name="title"
                component="input"
                type="text"
                className="input"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form__form-group-id-category">
            <div className="form__form-group form__form-group-id">
              <span className="form__form-group-label">Ilość</span>
              <div className="form__form-group-field">
                <Field
                  name="quantity"
                  component="input"
                  type="number"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Kategoria</span>
              <div className="form__form-group-field">
                <Field
                  name="category"
                  component="select"
                  type="text"
                  onChange={handleChange}
                >
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </Field>
              </div>
            </div>

            <div className="form__form-group">
              <span className="form__form-group-label">Podkategoria</span>
              <div className="form__form-group-field">
                <Field name="subcategory" component="select" type="text">
                  {subcategories.length > 0 &&
                    subcategories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </Field>
              </div>
            </div>

            <div className="form__form-group">
              <span className="form__form-group-label">Kolor</span>
              <div className="form__form-group-field">
                <Field name="color" component="select" type="text">
                  <option value="Czarny">Czarny</option>
                  <option value="Biały">Biały</option>
                  <option value="Srebrny">Srebrny</option>
                  <option value="Złoty">Złoty</option>
                </Field>
              </div>
            </div>

            <div className="form__form-group">
              <span className="form__form-group-label">Dostawa</span>
              <div className="form__form-group-field">
                <Field
                  name="shipping"
                  component="select"
                  type="text"
                  autoComplete="off"
                >
                  <option value="Nie">Nie</option>
                  <option value="Tak">Tak</option>
                </Field>
              </div>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Opis</span>
            <div className="form__form-group-field">
              <Field
                name="description"
                component="textarea"
                type="text"
                className="textarea"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form__form-group-price-discount">
            <div className="form__form-group form__form-group-price">
              <span className="form__form-group-label">Cena</span>
              <div className="form__form-group-field">
                <Field
                  name="price"
                  component="input"
                  type="number"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="form__half">
            <div className="form__form-group">
              <span className="form__form-group-label">Dodaj zdjęcie</span>
              <div className="form__form-group-field">
                <Field
                  name="images"
                  component={renderDropZoneMultipleField}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        <ButtonToolbar className="form__button-toolbar">
          <Button type="submit" className="btn-submit">
            Save
          </Button>
          <Button type="button" className="btn-cancel" onClick={reset}>
            Cancel
          </Button>
        </ButtonToolbar>
      </form>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getValueFromSingleProduct: (value) =>
    dispatch(getValueFromSingleProduct(value)),
});

const mapStateToProps = ({ formSingleValue }) => ({
  initialValues: formSingleValue.valueFrom,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "simple", // a unique identifier for this form
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(ProductCreateForm)
);
