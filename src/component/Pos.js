import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Collapse, Card, List, Input } from "antd";
import "./Pos.css";
import axios from "axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
const { Meta } = Card;

const AddToCartButton = () => {
  return (
    <Row>
      <Col>Add To Cart</Col>
      <Col>
        {" "}
        <ShoppingCartOutlined key="cart" />{" "}
      </Col>
    </Row>
  );
};

function Pos() {
  const [listItems, setListItem] = useState([]);
  const [search, setSearch] = useState("");

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  async function handleSimpleSearch() {
    const body = {
      search: search,
    }
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
      <div className="col-8">
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
                        actions={[<AddToCartButton />]}
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
      <div className="col-4"></div>
    </div>
  );
}
export default Pos;
