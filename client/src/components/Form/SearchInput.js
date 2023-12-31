import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{border: '2px solid green', borderRadius: '10px'}}
        />
        <button className="btn btn-outline-success" type="submit"
        style={{ backgroundColor: "green", color: "white" ,borderRadius:"5px", marginRight: '10px'}}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "green";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "green";
          e.target.style.color = "white";
        }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;