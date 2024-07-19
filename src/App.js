import CustomModal from "./component/CustomModal";
import Button from "react-bootstrap/Button";
import CategoriesList from "./component/CategoriesList";
import Company from "./component/Company";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import Product from "./component/Product";
import Orders from "./component/Orders";
import Pos from "./component/Pos";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [addForm, setaddForm] = useState(false);
  const handleaddFormShow = () => setaddForm(true);
  const handleaddFormClose = () => setaddForm(false);
  const [modalState, setModalState] = useState({
    posState: false,
    categoryState: false,
    companyState: false,
    orderState: false,
    productState: false,
  });
  const handleClose = (name) => setModalState({ ...modalState, [name]: false });
  const handleShow = (name) => setModalState({ ...modalState, [name]: true });

  return (
    <div className="App">
      <div className="container ">
        <div className="main-div">
          <div>
            <Button
              onClick={() => handleShow("posState")}
              variant="outline-secondary"
              style={{ padding: "20px 110px 20px 110px", fontSize: "20px" }}
            >
              POS
            </Button>
          </div>
          <div className="mt-4 ">
            <Button
              onClick={() => handleShow("categoryState")}
              variant="outline-danger "
              style={{ padding: "20px 90px 20px 90px", fontSize: "20px" }}
            >
              Categories
            </Button>
            <Button
              onClick={() => handleShow("companyState")}
              variant="outline-success ms-3"
              style={{ padding: "20px 90px", fontSize: "20px" }}
            >
              Company
            </Button>
          </div>
          <div className="mt-4">
            <Button
              onClick={() => handleShow("productState")}
              variant="outline-info"
              style={{ padding: "20px 100px", fontSize: "20px" }}
            >
              Product
            </Button>
            <Button
              onClick={() => handleShow("orderState")}
              variant="outline-warning ms-3"
              style={{ padding: "20px 110px 20px 110px", fontSize: "20px" }}
            >
              Orders
            </Button>
          </div>
        </div>
      </div>
      <CustomModal
        show={
          modalState.posState ||
          modalState.categoryState ||
          modalState.companyState ||
          modalState.orderState ||
          modalState.productState
        }
        handleClose={handleClose}
        handleShow={handleShow}
        body={
          modalState.posState ? (
            <Pos />
          ) : modalState.categoryState ? (
            <CategoriesList />
          ) : modalState.companyState ? (
            <Company />
          ) : modalState.orderState ? (
            <Orders />
          ) : (
            <Product />
          )
        }
        name={
          modalState.posState
            ? "posState"
            : modalState.categoryState
            ? "categoryState"
            : modalState.companyState
            ? "companyState"
            : modalState.orderState
            ? "orderState"
            : "productState"
        }
        title={
          modalState.posState
            ? "Point of Sale"
            : modalState.categoryState
            ? "Categories"
            : modalState.companyState
            ? "Companies"
            : modalState.orderState
            ? "Orders"
            : "Products"
        }
      />
    </div>
  );
}

export default App;
