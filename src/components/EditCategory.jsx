import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import service from "./service";

const EditCategory = (props) => {
  let navigate = useNavigate();
  const id = useParams();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategory = () => {
      service.getCategorySingle(id).then((data) => {
        setCategory(data);
        setLoading(false);
      });
    };
    getCategory();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    service.updateCategory(id, category).then((data) => {
      alert(data);
      navigate("/");
    });
  };

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  return loading ? (
    <div>Loading... </div>
  ) : (
    <div>
      <h1>Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category ID (cannot be changed) </label>
          <input
            type="text"
            className="form-control"
            name="id"
            value={category.id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            className="form-control"
            name="categoryName"
            defaultValue={category.categoryName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
