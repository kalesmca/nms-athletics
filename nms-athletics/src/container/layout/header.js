import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () =>{
    const navigate = useNavigate();
    const navigation = (path) =>{
        navigate(path);
    }
    return(
        <div>
           <div className="header">NMS Sports Club</div> 
           <div className="nav-links"> 

                        <nav>

                            <div className='link'>
                                <i className="fas fa-home" onClick={()=>{navigation("/dashboard")}}></i>
                                <Link to="dashboard">Dashboard</Link>
                            </div>
                            <div className='link'>
                                <i className="fas fa-address-card" onClick={()=>{navigation("/member-list")}}></i>
                                <Link to="player-list">Player List</Link>
                            </div>
                            <div className='link'>
                                <i className="fas fa-chart-line" onClick={()=>{navigation("/member-info")}}></i>
                                <Link to="registration">Registration</Link>
                            </div>
                            

                        </nav>

                    </div>
        </div>
    )
}

export default HeaderComponent;