import React from "react";
import { Outlet, Link } from "react-router-dom";
import HeaderComponent from "./header";
import { useNavigate } from 'react-router-dom';
import "./header.scss";


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

        </div>
    )
}

export default LayoutContainer;