import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import axios from "axios";

function ProductForm({ setproductShowform, getProduct, selectedRecord }) {
  const [company, setCompany] = useState([]);
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productImage: "",
    stock: 0,
    company: null,
  });
  const handleDropDownChange = ({ name, value }) => {
    let updatedProductData = { ...productData };
    updatedProductData[name] = value;
    setProductData(updatedProductData);
  };

  const handleChange = (event) => {
    let updatedProductData = { ...productData };
    if (event?.target?.files?.length) {
      updatedProductData.productImage = event.target.files[0];
      console.log(event.target.files[0], "event.target.files[0]");
    } else {
      updatedProductData[event.target.name] = event.target.value;
    }
    setProductData(updatedProductData);
  };
  async function getCompany() {
    const company = await axios.get("http://localhost:5000/companies");
    setCompany(company?.data?.companies);
  }
  useEffect(() => {
    getCompany();
    if (selectedRecord) {
      setProductData({
        ...selectedRecord,
        company: selectedRecord.company._id,
      });
    }
  }, []);
  async function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productImage", productData.productImage);
    formData.append("stock", productData.stock);
    formData.append("company", productData.company);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let products;
    if (selectedRecord) {
      products = await axios.put(
        `http://localhost:5000/products/${productData._id}`,
        formData,
        config
      );
    } else {
      products = await axios.post(
        "http://localhost:5000/products",
        formData,
        config
      );
    }
    getProduct();
    showToast(products?.data?.message);
    setproductShowform(false);
  }

  const showToast = (message) => {
    toast.success(message);
  };
  return (
    <div className="container-fluid d-flex justify-content-center">
      <form className="main" onSubmit={handleSubmit}>
        <div className="text-center">
          <h2 style={{ fontFamily: "sans-serif" }}>Product Form</h2>
        </div>
        <div className="my-4">
          <div>
            <h3 style={{ fontWeight: "500", fontSize: "20px" }}>
              Product Name:
            </h3>
          </div>
          <div>
            <Input
              value={productData.productName}
              name="productName"
              onChange={handleChange}
              className="col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 mt-4"
              required
            />
          </div>
        </div>
        <div className="my-4">
          <div>
            <h3 style={{ fontWeight: "500", fontSize: "20px" }}>
              Product Price:
            </h3>
          </div>
          <div>
            <Input
              value={productData.productPrice}
              name="productPrice"
              onChange={handleChange}
              className="col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 mt-4"
              required
            />
          </div>
        </div>
        <div className="my-4">
          <div>
            <h3 style={{ fontWeight: "500", fontSize: "20px" }}>
              Product Image:
            </h3>
          </div>
          <div>
            <Input
              type="file"
              // value={productData?.productImage?.name}
              name="productImage"
              onChange={handleChange}
              className="col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 mt-4"
              required
            />
          </div>
        </div>
        <div className="my-4">
          <div>
            <h3 style={{ fontWeight: "500", fontSize: "20px" }}>Stock:</h3>
          </div>

          <div>
            <Input
              value={productData.stock}
              name="stock"
              onChange={handleChange}
              className="col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 mt-4"
              required
              type="number"
            />
          </div>
        </div>
        <div className="my-4">
          <div>
            <h3 style={{ fontWeight: "500", fontSize: "20px" }}>Company:</h3>
          </div>
          <div>
            <Select
              value={productData.company}
              name="company"
              onChange={(event) =>
                handleDropDownChange({ name: "company", value: event })
              }
              className="col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 "
              options={company.map((ele) => ({
                label: ele.companyName,
                value: ele._id,
              }))}
              dropdownStyle={{ zIndex: 2000 }}
            />
          </div>
        </div>
        <div className=" my-5">
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
export default ProductForm;
