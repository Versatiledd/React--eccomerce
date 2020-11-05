import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import Dropzone from "react-dropzone";
// import "../../../../../scss/admin/eccomerce-forms/createForm.scss";
import renderDropZoneMultipleField from "../../../../forms/DropZoneMultiple";
import { getProduct, updateProduct } from "../../../../functions/product";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import axios from "axios";

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
  const [images, setImages] = useState([]);
  const { slug } = useParams();
  const history = useHistory();

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
        setImages(res.data.images);
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

  const getInfo = (files) => {
    let uploadFiles = [];
    files.map((fl, i) => {
      Resizer.imageFileResizer(
        fl,
        400,
        400,
        "JPEG",
        100,
        0,
        (uri) => {
          axios
            .post(
              "http://localhost:5000/api/uploadimages",
              { image: uri },
              {
                headers: {
                  "Access-Control-Allow-Origin": true,
                  authtoken: currentUser.token ? currentUser.token : "",
                },
              }
            )
            .then((res) => {
              uploadFiles.push(res.data);
              setImages(uploadFiles);
            });
        },
        "base64"
      );
    });
    return uploadFiles;
  };

  const handleImage = (files) => {
    if (files) {
      return getInfo(files);
    }
  };

  const onDrop = (files, onChange) => {
    const y = handleImage(files);
    onChange(y);
  };

  const removeFile = (index, e, onChange) => {
    e.preventDefault();
    // usuń state images globalnie z redux form
    onChange(images.filter((fl, i) => i !== index));
    // usuń state w aktualnym komponencie
    const removeImage = images.filter((fl, i) => i !== index);
    setImages(removeImage);
  };

  const renderImages = (props) => {
    const { onChange } = props.input;
    return (
      <div className="dropzone dropzone--multiple">
        <Dropzone
          className="dropzone__input"
          accept="image/jpeg, image/png"
          onDrop={(filesToUpload) => onDrop(filesToUpload, onChange)}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone__input">
              {(!images || images.length === 0) && (
                <div className="dropzone__drop-here">
                  <span className="lnr lnr-upload"> Upuść plik </span>
                </div>
              )}
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
        {images && Array.isArray(images) && (
          <div className="dropzone__imgs-wrapper">
            {images.map((file, i) => (
              <div className="dropzone__img" key={i}>
                <img
                  src={file.url}
                  alt=""
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundSize: "cover",
                  }}
                />
                {/* <p className="dropzone__img-name">{file.name}</p> */}
                <button
                  className="dropzone__img-delete"
                  type="button"
                  onClick={(e) => removeFile(i, e, onChange)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      // <div className="dropzone dropzone--multiple">
      //   <Dropzone
      //     className="dropzone__input"
      //     accept="image/jpeg, image/png"
      //     name={name}
      //     onDrop={(filesToUpload) => {
      //       this.onDrop(value ? value.concat(filesToUpload) : filesToUpload);
      //     }}
      //   >
      //     {({ getRootProps, getInputProps }) => (
      //       <div {...getRootProps()} className="dropzone__input">
      //         {(!files || files.length === 0) && (
      //           <div className="dropzone__drop-here">
      //             <span className="lnr lnr-upload"> Upuść plik </span>
      //           </div>
      //         )}
      //         <input {...getInputProps()} />
      //       </div>
      //     )}
      //   </Dropzone>
      //   {files && Array.isArray(files) && (
      //     <div className="dropzone__imgs-wrapper">
      //       {files.map((file, i) => (
      //         <div className="dropzone__img" key={i}>
      //           <img
      //             src={file.url}
      //             alt=""
      //             style={{
      //               width: "150px",
      //               height: "150px",
      //               backgroundSize: "cover",
      //             }}
      //           />
      //           {/* <p className="dropzone__img-name">{file.name}</p> */}
      //           <button
      //             className="dropzone__img-delete"
      //             type="button"
      //             onClick={(e) => this.removeFile(i, e)}
      //           >
      //             Remove
      //           </button>
      //         </div>
      //       ))}
      //     </div>
      //   )}
      // </div>
    );
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
                  component={renderImages}
                  // component={renderDropZoneMultipleField}
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

const mapStateToProps = (state) => ({
  initialValues: state.formSingleValue.valueFrom,
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
