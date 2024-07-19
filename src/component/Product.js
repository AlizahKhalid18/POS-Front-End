import { Table } from "antd";
import { useEffect, useState } from "react";
import { DownOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ProductForm from "./ProductForm";

function Product() {
  const [Showproductform, setproductShowform] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  async function getProduct() {
    const products = await axios.get(
      "http://localhost:5000/products?populate=company"
    );
    setProducts(products?.data?.products);
  }
  const handleproductFormshow = () => {
    setSelectedRecord(null);
    setproductShowform(!Showproductform);
  };
  useEffect(() => {
    getProduct();
  }, []);

  function handleEdit(record) {
    console.log(record, "record");
    setSelectedRecord(record);
    setproductShowform(true);
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
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
      key: "productPrice",
    },
    {
      title: "Product Image",
      dataIndex: "productImage",
      key: "productImage",
      render: (_, record) => (
        <img height={30} width={30} src={record.productImage} />
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (_, record) => <>{record?.company?.companyName}</>,
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
          onClick={handleproductFormshow}
        >
          {" "}
          {Showproductform ? "Back" : "Add Product"}
        </Button>
      </div>
      {Showproductform ? (
        <ProductForm
          setproductShowform={setproductShowform}
          getProduct={getProduct}
          selectedRecord={selectedRecord}
        />
      ) : (
        <Table dataSource={products} columns={columns} />
      )}
    </div>
  );
}
export default Product;
