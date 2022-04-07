import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import service from "./service";

function Add(props) {
  let navigate = useNavigate();
  const [product, setProduct] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    product.category = "http://localhost:8080/api/product-category/4";
    service.new(product).then((data) => {
      console.log(data);
      if (data.status === 201) {
        alert("Add Success");
        navigate("/");
      }
    });
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            defaultValue={product.productName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            name="unitPrice"
            defaultValue={product.unitPrice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>units In Stock</label>
          <input
            type="text"
            className="form-control"
            name="unitsInStock"
            value={product.unitsInStock}
            onChange={handleChange}
          />
        </div>
        {/* <div className="form-group">
                    <label>Category</label>
                    <input type="text" className="form-control" name="category.categoryName" value={product.category.categoryName} onChange={handleChange} />
                </div> */}

        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default Add;
