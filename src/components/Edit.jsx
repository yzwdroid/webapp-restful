import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import service from "./service";

function Edit(props) {
  let navigate = useNavigate();
  const id = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = () => {
      service.get(id).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    };
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    service.update(id, product).then((data) => {
      alert(data);
      navigate("/");
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Edit Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="productName"
                value={product.productName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                name="unitPrice"
                value={product.unitPrice}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>units In Stock</label>
              <input
                type="text"
                className="form-control"
                name="unitsInStock"
                defaultValue={product.unitsInStock}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Edit;
