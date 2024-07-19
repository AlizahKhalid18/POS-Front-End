import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import "./CompanyForm.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
function CompanyForm({ getCompanies, setCompanyShowform, selectedRecord }) {
  const [categories, setCategories] = useState([]);
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyAddress: "",
    ntn: "",
    category: null,
  });

  const handleDropDownChange = ({ name, value }) => {
    let updatedCompanyData = { ...companyData };
    updatedCompanyData[name] = value;
    setCompanyData(updatedCompanyData);
  };
  


  const handleChange = (event) => {
    let updatedCompanyData = { ...companyData };
    updatedCompanyData[event.target.name] = event.target.value;
    setCompanyData(updatedCompanyData);
  };
  async function getCategories() {
    const categories = await axios.get("http://localhost:5000/catogories");
    setCategories(categories?.data?.categories);
  }
  useEffect(() => {
    getCategories();
    if (selectedRecord) {
      setCompanyData({
        ...selectedRecord,
        category: selectedRecord.category._id,
      });
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    let companies;
    if (selectedRecord) {
      companies = await axios.put(
        `http://localhost:5000/companies/${companyData._id}`,
        companyData
      );
    } else {
      companies = await axios.post(
        "http://localhost:5000/companies",
        companyData
      );
    }
    getCompanies();
    showToast(categories?.data?.message);
    setCompanyShowform(false);
  }

  const showToast = (message) => {
    toast.success(message);
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="main">
        <div className="text-center">
          <h2 style={{ fontFamily: "sans-serif" }}>Company Form</h2>
        </div>
        <div className="my-4">
          <div>
            <h3 style={{ fontWeight: "500", fontSize: "20px" }}>
              Comapny Name:
            </h3>
          </div>
          <div>
            <Input
              value={companyData.companyName}
              name="companyName"
              onChange={handleChange}
              className="col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11"
            />
          </div>
        </div>
        <div className="my-4">
          <div>
            <h3 style={{ fontWeight: "500", fontSize: "20px" }}>
              Comapny Address:
            </h3>
          </div>
          <div>
            <Input
              value={companyData.companyAddress}
              name="companyAddress"
              onChange={handleChange}
              className="col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11"
            />
          </div>
        </div>
        <div className="my-4">
          <div>
            <h3 style={{ fontWeight: "500", fontSize: "20px" }}>NTN:</h3>
          </div>
          <div>
            <Input
              value={companyData.ntn}
              name="ntn"
              onChange={handleChange}
              className="col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 "
            />
          </div>
        </div>
        <div className="my-4">
          <div>
            <h3 style={{ fontWeight: "500", fontSize: "20px" }}>Category:</h3>
          </div>
          <div>
            <Select
              value={companyData.category}
              name="category"
              onChange={(event) =>
                handleDropDownChange({ name: "category", value: event })
              }
              className="col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 "
              options={categories.map((ele) => ({
                label: ele.categoryName,
                value: ele._id,
              }))}
              dropdownStyle={{ zIndex: 2000 }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Button
            variant="outline-success"
            style={{ padding: "8px 30px 8px 30px" }}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CompanyForm;
