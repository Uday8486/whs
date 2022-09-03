import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { resetGlobalError } from "../../../actions/globalError";
import { useSelector } from "../../../store/reducers";

const GlobalError = () => {
  const dispatch = useDispatch();
  const { error, errorMessage } = useSelector((state) => state.globalError);
  

  const handleClose = () => {
    dispatch(resetGlobalError());
  };

  return (
    <Modal show={error} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{error}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage}.
        Close this popup and try again.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GlobalError;
