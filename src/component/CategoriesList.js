import { Table } from "antd";
import { useEffect, useState } from "react";
import { DownOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import axios from "axios";
import Button from "react-bootstrap/Button";
import CategoriesForm from "./CategoriesForm";

function CategoriesList() {
  const [Showcategoryform, setcategoryShowform] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  async function getCategories() {
    const categories = await axios.get("http://localhost:5000/catogories");
    setCategories(categories?.data?.categories);
  }
  const handlecategoryFormshow = () => {
    setSelectedRecord(null);
    setcategoryShowform(!Showcategoryform);
  };
  useEffect(() => {
    getCategories();
  }, []);

  function handleEdit(record) {
    console.log(record, "record");
    setSelectedRecord(record);
    setcategoryShowform(true);
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
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
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
          variant="outline-success my-3 px-4 py-2"
          onClick={handlecategoryFormshow}
        >
          {" "}
          {Showcategoryform ? "Back" : "Add Categories"}
        </Button>
      </div>
      {Showcategoryform ? (
        <CategoriesForm
          setcategoryShowform={setcategoryShowform}
          getCategories={getCategories}
          selectedRecord={selectedRecord}
        />
      ) : (
        <Table dataSource={categories} columns={columns} />
      )}
    </div>
  );
}
export default CategoriesList;
