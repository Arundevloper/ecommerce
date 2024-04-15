import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Modal } from "antd";
import axios from "axios";
import "../../CSS/category.css"

const CategoryModule = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isEditModelOpen, setEditModelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteCategoryName, setDeleteCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  const showDeleteModal = (categoryId, categoryName) => {
    setDeleteCategoryId(categoryId);
    setDeleteCategoryName(categoryName);
    setIsModalOpen(true);
  };

  const showEditModal = (categoryId, categoryName) => {
    setEditCategoryId(categoryId);
    setCategoryName(categoryName);
    setEditModelOpen(true);
  };

  const handleDeleteOk = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${deleteCategoryId}`
      );
      if (res.data.success) {
        getAllTheCategories();
        toast.success(`${deleteCategoryName} is deleted`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(false);
  };

  const handleEditOk = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${editCategoryId}`,
        { name: categoryName }
      );
      if (res.data.success) {
        getAllTheCategories();
        toast.success(`${categoryName} is updated`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
    setEditModelOpen(false);
    setCategoryName("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditModelOpen(false);
    setCategoryName("");
  };

  const getAllTheCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      setCategories(res.data.category);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTheCategories();
  }, []);

  const handleAddCategory = async () => {
    if(!categoryName){
      toast.error("Field is empty");
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name: categoryName }
      );
      if (data.success) {
        getAllTheCategories();
        toast.success(`${categoryName} is created`);
        setCategoryName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="category-module">
      <h2>Add Category</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button
          className="btn categoryBtn ms-2 btn-outline-success"
          type="button"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
      <h2>Category List</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn ms-2 btn-outline-success"
                  onClick={() => showEditModal(category._id, category.name)}
                >
                  Edit
                </button>
                <button
                  className="btn  ms-2 btn-outline-danger"
                  onClick={() => showDeleteModal(category._id, category.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Delete Category"
        visible={isModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete {deleteCategoryName}?</p>
      </Modal>
      <Modal
        title="Edit Category"
        visible={isEditModelOpen}
        onOk={handleEditOk}
        onCancel={handleCancel}
      >
        <p>Edit category name:</p>
        <input
          type="text"
          className="form-control"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default CategoryModule;
