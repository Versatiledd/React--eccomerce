import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import {
  getCategories,
  removeCategory,
  createCategory,
} from "../../../functions/category";
import "./categoryCreate.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom";

import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryCreate = ({ match }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  let history = useHistory();
  const pathUrl = match.path;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({ name }, currentUser.token)
      .then((res) => {
        setName("");
        swal("Udało się!", "Kategoria została stworzona", "success");
        loadCategories();
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

  const handleRemove = async (slug) => {
    let answer = window.confirm("Delete?");
    if (answer) {
      removeCategory(slug, currentUser.token)
        .then((res) => {
          swal("Udało się!", "Kategoria została usunięta", "success");
          loadCategories();
        })
        .catch((err) => {
          swal({
            title: "Błąd!",
            text: err.response.data,
            icon: "warning",
            dangerMode: true,
          });
        });
    }
  };

  const handleUpdate = (slug) => {
    history.push(`/admin/kategorie/${slug}`);
  };

  const handleSearchWithKeyword = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.trim().toLowerCase());
    console.log(keyword);
  };

  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword);
  return (
    <div className="main-container">
      <AdminNav />
      <div
        style={{
          minWidth: "80%",
        }}
      >
        <div className="main-category-wrapper">
          <CategoryForm
            setName={setName}
            name={name}
            handleSubmit={handleSubmit}
            keyword={keyword}
            handleSearchWithKeyword={handleSearchWithKeyword}
            pathUrl={pathUrl}
          />
          {categories.filter(searched(keyword)).map((category) => (
            <div className="parent-category" key={category._id}>
              <div className="category-results">
                <h2 className="title-result">{category.name}</h2>
                <div className="wrapper-icons">
                  <div
                    className="single-icon"
                    onClick={() => handleRemove(category.slug)}
                  >
                    <AiOutlineDelete style={{ color: "#FF8080" }} />
                  </div>
                  <div
                    className="single-icon"
                    style={{ color: "green" }}
                    onClick={() => handleUpdate(category.slug)}
                  >
                    <BiEditAlt />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
