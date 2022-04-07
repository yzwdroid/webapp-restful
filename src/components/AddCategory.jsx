import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import service from "./service";

const AddCategory = () => {
  let navigate = useNavigate();
  const [category, setCategory] = useState({});

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category);
    service.newCategory(category).then((data) => {
      alert(data);
      navigate("/");
      window.location.reload(true);
    });
  };

  return (
    <>
      <div>
        <h1>Add Category</h1>
        <form>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              className="form-control"
              name="categoryName"
              value={category.categoryName}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Add Category
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
