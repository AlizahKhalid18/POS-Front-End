import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
function Orders() {
  const [orders, setOrders] = useState([]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const itemColumns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      render: (_, record) => {
        return <> {record?.product?.productName} </>;
      },
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
      render: (_, record) => {
        return <> {record?.product?.productPrice} </>;
      },
    },
    {
      title: "Product Quantity",
      dataIndex: "quantity",
      render: (_, record) => {
        return <> {record?.quantity} </>;
      },
    },
    {
      title: "Product Total Price",
      dataIndex: "productTotalPrice",
      render: (_, record) => {
        return <> {record?.quantity * record?.product?.productPrice} </>;
      },
    },
  ];

  async function getOrders() {
    const orders = await axios.get("http://localhost:5000/orders");
    setOrders(orders.data.orders);
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <Table
        expandable={{
          expandedRowRender: (record) => {
            return (
              <Table
                pagination={false}
                dataSource={record.items}
                columns={itemColumns}
              />
            );
          },
        }}
        dataSource={orders}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </div>
  );
}
export default Orders;
