import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
  getSubs,
  removeSubCategory,
  createSubCategory,
} from "../../../functions/sub";
import "../category/categoryCreate.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom";

import CategoryForm from "../../../components/forms/CategoryForm";

const SubCreate = ({ match }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  let history = useHistory();
  const pathUrl = match.path;

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };
  const loadSubs = () => {
    getSubs()
      .then((res) => setSubs(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSubCategory({ name, parent: parentCategory }, currentUser.token)
      .then((res) => {
        setName("");
        swal("Udało się!", "Pod kategoria została stworzona", "success");
        loadSubs();
      })
      .catch((err) => {
        swal({
          title: "Błąd!",
          text: err,
          icon: "warning",
          dangerMode: true,
        });
      });
  };

  const handleRemove = async (slug) => {
    let answer = window.confirm("Delete?");
    if (answer) {
      removeSubCategory(slug, currentUser.token)
        .then((res) => {
          swal("Udało się!", "Pod kategoria została usunięta", "success");
          loadSubs();
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
    history.push(`/admin/sub/${slug}`);
  };

  const handleSearchWithKeyword = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.trim().toLowerCase());
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
            categories={categories}
            setParentCategory={setParentCategory}
          />
          {subs.filter(searched(keyword)).map((s) => (
            <div className="parent-category" key={s._id}>
              <div className="category-results">
                <h2 className="title-result">{s.name}</h2>
                <div className="wrapper-icons">
                  <div
                    className="single-icon"
                    onClick={() => handleRemove(s.slug)}
                  >
                    <AiOutlineDelete style={{ color: "#FF8080" }} />
                  </div>
                  <div
                    className="single-icon"
                    style={{ color: "green" }}
                    onClick={() => handleUpdate(s.slug)}
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

export default SubCreate;
