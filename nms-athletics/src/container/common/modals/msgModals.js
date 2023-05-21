import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {PopupContext} from '../../../config/context';
import { useNavigate } from 'react-router-dom';

const  MessageModal =(props) => {
  console.log(props)
  const navigate = useNavigate();

  const {msgPopupFlag, setMsgPopupFlag, navigationPath, setNavigationPath, popupObj, setPopupObj} = useContext(PopupContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClose = () =>{
    if(navigationPath){
      navigate(navigationPath);
      setMsgPopupFlag(false);
    } else {
      setMsgPopupFlag(false)
    }
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={msgPopupFlag}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{popupObj?.title ? popupObj.title : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {popupObj?.content ? popupObj.content : "Default MESSAGE"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
          {popupObj?.btn1 ? popupObj.btn1 : "OK"}
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MessageModal;