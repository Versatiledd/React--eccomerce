import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import "./categoryCreate.scss";
import swal from "sweetalert";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  let slug = match.params.slug;

  useEffect(() => {
    getSingleCantegory();
  }, []);

  const getSingleCantegory = () => {
    getCategory(slug)
      .then((res) => setName(res.data.name))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(slug, { name }, currentUser.token)
      .then((res) => {
        setName("");
        swal("Udało się!", "Zaaktualizowano kategorie", "success").then(() =>
          history.push("/admin/kategorie")
        );
      })
      .catch((err) => {
        swal({
          title: "Błąd!",
          text: err.response.data,
          icon: "warning",
          dangerMode: true,
        });
      });
  };

  const categoryForm = () => (
    <form className="form-category" onSubmit={handleSubmit}>
      <div className="form-container">
        <h4 className="ctg-title">Uaktualnij kategorie.</h4>
        <div className="category-wrapper">
          {/* <label htmlFor="" className="ctg-label">
            Nazwa kategorii
          </label> */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
            className="ctg-input"
            placeholder="Dodaj kategorię"
          />
          <button className="btn-category">Uaktualnij</button>
        </div>
      </div>
    </form>
  );
  return (
    <div className="main-container">
      <AdminNav />
      <div
        style={{
          minWidth: "80%",
        }}
      >
        <div className="main-category-wrapper">
          {categoryForm()}
          <div className="parent-category">
            <div className="category-results">
              <h2 className="title-result">{name}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
