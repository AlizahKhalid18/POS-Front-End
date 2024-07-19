import { useEffect, useState } from "react";
import { Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import axios from "axios";

function CategoriesForm({
  setcategoryShowform,
  getCategories,
  selectedRecord,
}) {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
  });

  useEffect(() => {
    if (selectedRecord) {
      setCategoryData(selectedRecord);
    }
  }, []);

  const handleChange = (event) => {
    let updatedCategoryData = { ...categoryData };
    updatedCategoryData[event.target.name] = event.target.value;
    setCategoryData(updatedCategoryData);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    let categories;
    if (selectedRecord) {
      categories = await axios.put(
        `http://localhost:5000/catogories/${categoryData._id}`,
        categoryData
      );
    } else {
      categories = await axios.post(
        "http://localhost:5000/catogories",
        categoryData
      );
    }
    getCategories();
    showToast(categories?.data?.message);
    setcategoryShowform(false);
  }

  const showToast = (message) => {
    toast.success(message);
  };
  return (
    <div className="container-fluid d-flex justify-content-center">
      <form className="main" onSubmit={handleSubmit}>
        <div className="text-center">
          <h2 style={{ fontFamily: "sans-serif" }}>Category Form</h2>
        </div>
        <div className="mt-5">
          <div>
            <h3 style={{ fontWeight: "500", fontSize: "22px" }}>
              Category Name:
            </h3>
          </div>
          <div>
            <Input
              value={categoryData.categoryName}
              name="categoryName"
              onChange={handleChange}
              className="col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 mt-4"
              required
            />
          </div>
        </div>
        <div className=" mt-4">
          <Button
            variant="outline-success"
            style={{ padding: "2% 11% 2% 11%" }}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
export default CategoriesForm;
