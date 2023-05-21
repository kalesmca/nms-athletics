import React,{useState, useEffect, useContext} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./login.scss";
import {AUTH_STATUS} from '../../config/constants';
import {getPlayerList} from '../../redux/actions/players';
import {useDispatch, useSelector} from 'react-redux';
import {PopupContext} from '../../config/context'
const LoginComponent = () =>{
    const [mobile, setMobile] = useState("");
    const dispatch = useDispatch();
    const playerState = useSelector((state)=> state.players)
    const {msgPopupFlag, setMsgPopupFlag, navigationPath, setNavigationPath, popupObj, setPopupObj} = useContext(PopupContext)
    useEffect(()=>{
        console.log('state:', playerState)
    })

    const submit = () =>{
        const obj = {
            title : !mobile || mobile?.toString()?.length !=10 ? "Please Enter valid 10 digit Mobile Number" :"Please re-confirm your Mobile Number",
            content: mobile,
            contentSpinner: true,
            btn2:!mobile || mobile?.toString()?.length !=10 ? "":"Confirm",
            btn1:"Reset"
        }
        setPopupObj(obj)
        const timer = setTimeout(() => {
          setMsgPopupFlag(true); 
        }, 1000);
        return () => clearTimeout(timer);
        
        
    }

    const setLocal = (e) =>{
        dispatch(getPlayerList())   

        const obj = {
            mobile: mobile,
            access: AUTH_STATUS.PENDING
        }
        localStorage.setItem("auth", JSON.stringify(obj));
    }

   
    return(
        <Form >
      <Row className="mb-3">
        

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contact Mobile</Form.Label>
          <Form.Control type="number" placeholder="Mobile Number" value={mobile}
            onChange={(e) => { setMobile(e.target.value )}}  onBlur={()=>{setLocal()}}
          />
          {/* {
            errObj.mobile.touched && errObj.mobile.err && <div className='err'> Valid mobile Number</div>
          } */}
        </Form.Group>

        
      </Row>


      <Button variant="primary" onClick={() => { submit() }}>
        Submit
      </Button>
    </Form>
    )
}

export default LoginComponent;

