import Modal from "react-bootstrap/Modal";
function CustomModal({
  handleShow,
  handleClose,
  show,
  body,
  companyshow,
  name,
  title,
}) {
  return (
    <>
      <Modal
        fullscreen={true}
        show={show}
        companyshow={companyshow}
        onHide={() => handleClose(name)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
