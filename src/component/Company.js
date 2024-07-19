import { Dropdown, Table } from "antd";
import { useEffect, useState } from "react";
import CompanyForm from "../component/CompanyForm";

import Button from "react-bootstrap/Button";
import axios from "axios";
import { MoreOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
function Company() {
  const [ShowCompanyform, setCompanyShowform] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  async function getCompanies() {
    const companies = await axios.get(
      "http://localhost:5000/companies?populate=category"
    );
    setCompanies(companies?.data?.companies);
  }
  
  const handleCompanyFormshow = () => {
    setSelectedRecord(null);
    setCompanyShowform(!ShowCompanyform);
  };
  useEffect(() => {
    getCompanies();
  }, []);

  function handleEdit(record) {
    console.log(record, "record");
    setSelectedRecord(record);
    setCompanyShowform(true);
  }
  function handleDelete(record) {}
  const getItems = (record) => [
    {
      label: (
        <Button onClick={() => handleEdit(record)} variant="primary">
          Edit
        </Button>
      ),
      key: "0",
    },
    {
      label: (
        <Button onClick={() => handleDelete(record)} variant="primary">
          Delete
        </Button>
      ),
      key: "1",
    },
  ];
  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Address",
      dataIndex: "companyAddress",
      key: "companyAddress",
    },
    {
      title: "NTN",
      dataIndex: "ntn",
      key: "ntn",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, record) => <>{record?.category?.categoryName}</>,
    },
    {
      title: "Action",
      key: "action",

      render: (text, record) => (
        <Dropdown
          menu={{
            items: getItems(record),
          }}
          trigger={["click"]}
        >
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Button
          onClick={handleCompanyFormshow}
          variant="outline-success my-3 px-4 py-2"
        >
          {ShowCompanyform ? "Back" : "Add Company"}
        </Button>
      </div>
      {ShowCompanyform ? (
        <CompanyForm
          getCompanies={getCompanies}
          setCompanyShowform={setCompanyShowform}
          selectedRecord={selectedRecord}
        />
      ) : (
        <Table dataSource={companies} columns={columns} />
      )}
      <ToastContainer />
    </div>
  );
}
export default Company;
