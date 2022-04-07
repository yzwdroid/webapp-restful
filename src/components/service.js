let url = "http://localhost:8080/api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  new: async (product) => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    const res = await fetch(`${url}/products`, options);
    return await res;
  },

  get: async (id) => {
    const res = await fetch(`${url}/products/${id.id}`, {
      mode: "cors",
      method: "GET",
      headers: {},
    });
    return res.json();
  },

  getAll: async () => {
    const res = await fetch(`${url}/products`, {
      mode: "cors",
    });
    return res.json();
  },

  update: async (id, product) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    const res = await fetch(`${url}/products/${id.id}`, options);
    return await res.json();
  },

  delete: async (id) => {
    const options = {
      method: "DELETE",
    };
    const res = await fetch(`${url}/products/${id}`, options);
    console.log(res);
    return res;
  },

  getCategory: async (id) => {
    const res = await fetch(`${url}/products/${id}/category`);
    return res.json();
  },

  getCategorySingle: async (id) => {
    const res = await fetch(`${url}/product-category/${id.id}`);
    return res.json();
  },

  getCategoryAll: async () => {
    const res = await fetch(`${url}/product-category`);
    return res.json();
  },

  updateCategory: async (id, category) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    };
    const res = await fetch(`${url}/product-category/${id.id}`, options);
    let result = null;
    if (res.status === 200) {
      result = "Category updated";
    } else {
      result = "Category not updated";
    }
    return result;
  },

  newCategory: async (category) => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    };
    const res = await fetch(`${url}/product-category`, options);
    let result = null;
    if (res.status === 201) {
      result = "Category added";
    } else {
      result = "Category not added";
    }
    return result;
  },

  deleteCategory: async (id) => {
    const options = {
      method: "DELETE",
    };
    const res = await fetch(`${url}/product-category/${id}`, options);
    console.log(res);
    return res;
  },
};
