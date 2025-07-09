import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { searchQuery } from "../../features/search/searchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch(searchQuery({ text: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <form className="d-flex align-items-center" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control me-2"
        placeholder="Search..."
        style={{ width: "200px" }}
      />
      <button type="submit" className="btn btn-outline-primary">
        <SearchOutlined />
      </button>
    </form>
  );
};

export default Search;
