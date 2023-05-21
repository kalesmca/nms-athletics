import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PopupContext } from '../../../config/context';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_STATUS } from '../../../config/constants';
import { setAuthStatus } from '../../../redux/actions/players';

const MessageModal = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.players)
  const [flag, setFlag] = useState(true)
  const { msgPopupFlag, setMsgPopupFlag, navigationPath, setNavigationPath, popupObj, setPopupObj } = useContext(PopupContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlag(false); 
    }, 2000);
    return () => clearTimeout(timer);

  }, [])

  const loginAuthentication = () => {
    let navPath = "registration"
    let localAuth = JSON.parse(localStorage.getItem("auth"));
    if (localAuth.mobile == "8682890117") {
      localAuth.access = AUTH_STATUS.SUPER_ADMIN_ACCESS;
      navPath = "player-list"
    } else if (playerState.regPlayerList?.length) {
      localAuth.access = AUTH_STATUS.REGISTERED;
      navPath = "dashboard"
    } else {
      localAuth.access = AUTH_STATUS.NOT_REGISTERED;
    }
    dispatch(setAuthStatus(localAuth.access))
    localStorage.setItem("auth", JSON.stringify(localAuth))

    navigate(navPath);
    setPopupObj({})
    setMsgPopupFlag(false);
  }


  const onClose = () => {
    if (navigationPath) {
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
          <Button variant="primary" onClick={onClose}>
            {popupObj?.btn1 ? popupObj.btn1 : "OK"}
          </Button>
          {popupObj.btn2 ?
            (<Button variant="primary" disabled={flag} onClick={() => { loginAuthentication() }} >
              {popupObj.btn2}
            </Button>) : ""}
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MessageModal;