import React from "react";
import { Outlet, Link } from "react-router-dom";
import HeaderComponent from "./header";
import { useNavigate } from 'react-router-dom';
import "./header.scss";
import MessageModal from "../common/modals/msgModals";

const LayoutContainer = () =>{
    const navigate = useNavigate();
    const navigation = (path) =>{
        navigate(path);
    }
    return(
        <div>
            <div className="header-container">
                <HeaderComponent/>
            </div>
            <div className="body-container">
                <Outlet />
            </div>
            <MessageModal />

        </div>
    )
}

export default LayoutContainer;