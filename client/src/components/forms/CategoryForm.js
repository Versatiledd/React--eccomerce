import React from "react";
import "../../pages/admin/category/categoryCreate.scss";

const CategoryForm = ({
  name,
  setName,
  handleSubmit,
  keyword,
  handleSearchWithKeyword,
  pathUrl,
  categories,
  setParentCategory,
}) => {
  return (
    <form className="form-category" onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="search-input">
          {pathUrl === "/admin/kategorie" && (
            <h4 className="ctg-title">Stwórz nową kategorię dla produktów.</h4>
          )}
          {pathUrl === "/admin/sub" && (
            <>
              <h4 className="ctg-title">
                Stwórz nową podkategorię dla produktów.
              </h4>
            </>
          )}
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
          {/* <div className="form__form-group">
            <span className="form__form-group-label">Select Option</span>
            <div className="form__form-group-field">
              <Field
                name="select"
                component={renderSelectField}
                className="form__form-group-input-wrap--error-above"
                type="text"
                options={[
                  { value: "one", label: "One" },
                  { value: "two", label: "Two" },
                ]}
              />
            </div>
          </div> */}
          {pathUrl === "/admin/sub" && (
            <>
              <select
                name="category"
                onChange={(e) => setParentCategory(e.target.value)}
                className="category-select"
                autoFocus
              >
                <option>Wybierz kategorię</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </>
          )}
          {pathUrl === "/admin/kategorie" && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
                className="ctg-input"
                placeholder="Wpisz kategorię"
              />
              <button className="btn-category">Dodaj</button>
            </>
          )}
          {pathUrl === "/admin/sub" && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
                className="ctg-input"
                placeholder="Nowa podkategoria"
              />
              <button className="btn-category">Stwórz podkategorię</button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
