import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./search.scss";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const { text } = search;

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <div className="search-wrapper">
      <form action="" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Szukaj"
          className="search-input"
          value={text}
        />
      </form>
    </div>
  );
};

export default Search;
