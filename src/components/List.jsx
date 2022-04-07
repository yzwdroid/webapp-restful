import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import service from "./service";
import CategoryList from "./CategoryList";

const List = (props) => {
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getData() {
      let temps = [];
      service
        .getAll()
        .then((data) => {
          temps = data._embedded.products;
          Promise.all(
            temps.map((item) =>
              service.getCategory(item.id).then((data) => {
                item.categoryName = data.categoryName;
                console.log(item);
              })
            )
          ).then(() => {
            console.log(temps);
            setProducts(temps);
            setLoading(false);
          });
        })
        .catch((err) => console.log(err));
    }
    getData();
  }, []);

  const editProduct = (id) => {
    navigate(`/edit/${id}`);
  };

  const deleteProduct = (id) => {
    service.delete(id).then((data) => {
      if (data.status === 204) {
        alert("Delete Success");
        navigate("/");
        window.location.reload(true);
      }
    });
  };

  return (
    <div className="list">
      <Table className="table" striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td>{product.categoryName}</td>
                <td>
                  <Button
                    className="btn btn-primary"
                    onClick={() => editProduct(product.id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    key={product.id}
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <Button
                className="btn btn-primary"
                onClick={() => navigate("/add")}
              >
                Add Product
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>

      <CategoryList />
    </div>
  );
};

export default List;
