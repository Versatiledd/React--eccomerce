import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { getSubCategory, updateSubCategory } from "../../../functions/sub";
import swal from "sweetalert";

const SubUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [parent, setParent] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  let slug = match.params.slug;

  console.log(categories);

  useEffect(() => {
    loadCategories();
    getSub();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };

  const getSub = () => {
    getSubCategory(slug)
      .then((s) => {
        setName(s.data.name);
        setParent(s.data.parent);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSubCategory(slug, { name, parent }, currentUser.token)
      .then((res) => {
        setName("");
        swal("Udało się!", "Zaaktualizowano kategorie", "success").then(() =>
          history.push("/admin/sub")
        );
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Błąd!",
          text: err.response.data,
          icon: "warning",
          dangerMode: true,
        });
      });
  };

  return (
    <div className="main-container">
      <AdminNav />
      <div
        style={{
          minWidth: "80%",
        }}
      >
        <div className="main-category-wrapper">
          <form className="form-category" onSubmit={handleSubmit}>
            <div className="form-container">
              <h4 className="ctg-title">Uaktualnij podkategorię.</h4>
              <select
                name="category"
                onChange={(e) => setParent(e.target.value)}
                className="category-select"
                autoFocus
              >
                <option>Wybierz kategorię</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={c._id === parent}
                    >
                      {c.name}
                    </option>
                  ))}
              </select>
              <div className="category-wrapper">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                  className="ctg-input"
                  placeholder="Uaktualnij"
                />
                <button className="btn-category">Uaktualnij</button>
              </div>
            </div>
          </form>
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

export default SubUpdate;
