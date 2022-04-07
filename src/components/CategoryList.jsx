import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

import service from "./service";

const CategoryList = () => {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getCategories() {
      service.getCategoryAll().then((data) => {
        setCategories(data._embedded.productCategory);
        setLoading(false);
      });
    }
    getCategories();
  });

  const editCategory = (id) => {
    navigate(`/editCategory/${id}`);
  };

  const deleteCategory = (id) => {
    service.deleteCategory(id).then((data) => {
      if (data.status === 204) {
        alert("Delete Success");
        navigate("/");
        window.location.reload(true);
      }
    });
  };

  return loading ? (
    <div>Loading... </div>
  ) : (
    <>
      <Table className="category" striped bordered hover>
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.categoryName}</td>

              <td>
                <Button
                  className="btn btn-primary"
                  onClick={() => editCategory(category.id)}
                >
                  Edit
                </Button>{" "}
                <Button
                  className="btn btn-danger"
                  onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <Button
                className="btn btn-primary"
                onClick={() => navigate("/addCategory")}
              >
                Add Category
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};

export default CategoryList;
