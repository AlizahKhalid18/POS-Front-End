import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Collapse, Card, List, Input } from "antd";
import "./Pos.css";
import axios from "axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
const { Meta } = Card;

const AddToCartButton = ({ addToCart, record }) => {
  return (
    <button
      onClick={() => addToCart({ ...record, quantity: 1 })}
      className="w-100 addToCartBtn"
    >
      <Row>
        <Col lg={9} className="d-flex">
          Add To Cart
        </Col>
        <Col lg={3}>
          {" "}
          <ShoppingCartOutlined key="cart" />{" "}
        </Col>
      </Row>
    </button>
  );
};

function Pos() {
  const [listItems, setListItem] = useState([]);
  const [search, setSearch] = useState("");
  const [cartList, setCartList] = useState([]);

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  async function handleSimpleSearch() {
    const body = {
      search: search,
    };
    const result = await axios.post(
      "http://localhost:5000/products/search",
      body
    );
    setListItem(result.data.product);
  }

  async function getPageData() {
    const products = await axios.get("http://localhost:5000/products");
    setListItem(products.data.products);
  }

  useEffect(() => {
    getPageData();
  }, []);

  const addToCart = (cartItem) => {
    let _cartList = [...cartList];
    const foundItem = _cartList.filter((item) => item._id === cartItem._id);
    if (foundItem.length) {
      return;
    }
    _cartList.push(cartItem);
    setCartList(_cartList);
  };

  const handleQauntity = (opr, record) => {
    let _cartList = [...cartList];
    const index = _cartList.findIndex((x) => x._id === record._id);
    if (opr === "+") {
      if (index > -1) {
        _cartList[index].quantity += 1;
        setCartList(_cartList);
      }
    } else {
      if (index > -1 && _cartList[index].quantity > 1) {
        _cartList[index].quantity -= 1;
        setCartList(_cartList);
      }
    }
  };

  const handleRemoveItem = (item) => {
    let _cartList = [...cartList];
    const index = _cartList.findIndex((x) => x._id === item._id);
    _cartList.splice(index, 1);
    setCartList(_cartList);
  };

  const placeOrder = async () => {
    const payload = {
      items: cartList.map((x) => ({ product: x._id, quantity: x.quantity })),
      total: cartList.reduce(
        (acc, curr) => acc + curr.productPrice * curr.quantity,
        0
      ),
    };
    const result = await axios.post("http://localhost:5000/orders", payload);
    if (result.data.status === "ok") {
      toast(result.data.message);
      setCartList([]);
    }
  };

  const items = [
    {
      key: "1",
      label: "Search",
      children: (
        <div>
          <div inline>
            <Row>
              <Col xs="auto">
                <Input
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  value={search}
                  onChange={handleSearchChange}
                />
              </Col>
              <Col xs="auto">
                <Button
                  onClick={handleSimpleSearch}
                  variant="info"
                  type="submit"
                >
                  Search
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Advance Search",
      children: (
        <div>
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Category"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Company"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Product"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button variant="info" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      ),
    },
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-7">
          <Collapse items={items} />
          <div className="mt-5 overflow-auto overflow-x-hidden listContainter">
            <Row className="p-3">
              <Row>
                <Col>
                  <h5> Products </h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <List
                    grid={{
                      gutter: 16,
                      column: 4,
                    }}
                    dataSource={listItems}
                    renderItem={(item) => (
                      <List.Item>
                        <Card
                          cover={
                            <img
                              src={item.productImage}
                              height={100}
                              width={100}
                            />
                          }
                          actions={[
                            <AddToCartButton
                              addToCart={addToCart}
                              record={item}
                            />,
                          ]}
                        >
                          <Meta
                            title={item.productName}
                            description={`${item.productPrice} RS`}
                          />
                        </Card>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Row>
          </div>
        </div>
        <div className="col-5 cart">
          <Row className="p-3">
            <h3 className="p-0"> Cart </h3>
            <table>
              <thead>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Total Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </thead>

              <tbody>
                {cartList.map((item) => (
                  <tr style={{ height: "40px" }} key={item._id}>
                    <td> {item.productName} </td>
                    <td> {item.productPrice} </td>
                    <td> {item.productPrice * item.quantity} </td>
                    <td>
                      <button
                        onClick={() => handleQauntity("-", item)}
                        className="quntBtn "
                      >
                        -
                      </button>
                      {"  "} {item.quantity} {"  "}
                      <button
                        onClick={() => handleQauntity("+", item)}
                        className="quntBtn"
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        className="quntBtn"
                        onClick={() => handleRemoveItem(item)}
                      >
                        {" "}
                        Remove{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Row>
          <Row>
            <hr />
            <Row>
              <Col lg={10}>Total price</Col>
              <Col lg={2}>
                {cartList.reduce(function (acc, obj) {
                  return acc + obj.productPrice * obj.quantity;
                }, 0)}{" "}
                RS/.
              </Col>
            </Row>
          </Row>
          <Row className="p-2">
            <button className="quntBtn" onClick={placeOrder}>
              {" "}
              Place Order{" "}
            </button>
          </Row>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Pos;
