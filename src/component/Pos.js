import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import img from "../assets/productimg.webp";
import Col from "react-bootstrap/Col";
import { Collapse } from "antd";
import "./Pos.css";
function Pos() {
  const items = [
    {
      key: "1",
      label: "Search",
      children: (
        <div>
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button variant="info" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
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
                  Submit
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
      <div>
        <Collapse items={items} />
      </div>
      <div className="cards mt-5">
        <Row>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <Card style={{ width: "18rem" }}>
              <div className="d-flex mt-2 ms-2">
                <Card.Img
                  variant="top"
                  style={{ width: "12%", borderRadius: "50%", height: "30px" }}
                  src={img}
                />
                <Card.Text className="ms-3">Product Name: RP</Card.Text>
              </div>
              <Card.Body>
                <Card.Text>Product Price: 500</Card.Text>
                <Card.Text>Company: Beautybliss</Card.Text>
                <Card.Text>Category:Foundation</Card.Text>
                <Button variant="info">Add to Carts</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <Card style={{ width: "18rem" }}>
              <div className="d-flex mt-2 ms-2">
                <Card.Img
                  variant="top"
                  style={{ width: "12%", borderRadius: "50%", height: "30px" }}
                  src={img}
                />
                <Card.Text className="ms-3">Product Name: RP</Card.Text>
              </div>
              <Card.Body>
                <Card.Text>Product Price: 500</Card.Text>
                <Card.Text>Company: Beautybliss</Card.Text>
                <Card.Text>Category:Foundation</Card.Text>
                <Button variant="info">Add to Carts</Button>
              </Card.Body>
            </Card>
          </div>
        </Row>
        <Row className="mt-4">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <Card style={{ width: "18rem" }}>
              <div className="d-flex mt-2 ms-2">
                <Card.Img
                  variant="top"
                  style={{ width: "12%", borderRadius: "50%", height: "30px" }}
                  src={img}
                />
                <Card.Text className="ms-3">Product Name: RP</Card.Text>
              </div>
              <Card.Body>
                <Card.Text>Product Price: 500</Card.Text>
                <Card.Text>Company: Beautybliss</Card.Text>
                <Card.Text>Category:Foundation</Card.Text>
                <Button variant="info">Add to Carts</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <Card style={{ width: "18rem" }}>
              <div className="d-flex mt-2 ms-2">
                <Card.Img
                  variant="top"
                  style={{ width: "12%", borderRadius: "50%", height: "30px" }}
                  src={img}
                />
                <Card.Text className="ms-3">Product Name: RP</Card.Text>
              </div>
              <Card.Body>
                <Card.Text>Product Price: 500</Card.Text>
                <Card.Text>Company: Beautybliss</Card.Text>
                <Card.Text>Category:Foundation</Card.Text>
                <Button variant="info">Add to Carts</Button>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </div>
    </div>
  );
}
export default Pos;
