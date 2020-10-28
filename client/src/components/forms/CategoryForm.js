import React from "react";
import "../../pages/admin/category/categoryCreate.scss";

const CategoryForm = ({
  name,
  setName,
  handleSubmit,
  keyword,
  handleSearchWithKeyword,
}) => {
  return (
    <form className="form-category" onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="search-input">
          <h4 className="ctg-title">Stwórz nową kategorię dla produktów.</h4>
          <input
            type="search"
            value={keyword}
            onChange={(e) => handleSearchWithKeyword(e)}
            autoFocus
            className="ctg-input"
            placeholder="Szukaj po frazie"
          />
        </div>

        <div className="category-wrapper">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
            className="ctg-input"
            placeholder="Dodaj kategorię"
          />
          <button className="btn-category">Stwórz kategorię</button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
