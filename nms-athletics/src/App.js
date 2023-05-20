import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerListComponent from './container/player-list/playerListComponent';
import PlayerRegistration from './container/registration/playerRegistration';
import PlayerDashboard from './container/player-dashboard/playerDashboard';
import LayoutContainer from './container/layout/layoutContainer';
import LoginComponent from './container/login/loginComponent';
import NotFoundComponent from './container/notFound/notFoundComponent';
import { PopupContext} from './config/context';

function App() {
  const [msgPopupFlag, setMsgPopupFlag] = useState(false);
  const [navigationPath, setNavigationPath] = useState("");
  const [popupObj, setPopupObj] = useState({});
  return (
    <BrowserRouter >
          <PopupContext.Provider value={{ msgPopupFlag, setMsgPopupFlag, navigationPath, setNavigationPath, popupObj, setPopupObj}}>

        <Routes>
          <Route path="/" element={<LayoutContainer />}>
                <Route index element={<LoginComponent />} />
                <Route path="player-list" element={<PlayerListComponent />} />
                <Route path="registration" element={<PlayerRegistration />} />
                <Route path="dashboard" element={<PlayerDashboard />} />
                <Route path="*" element={<NotFoundComponent />} />
                
          </Route>

        </Routes>
        </PopupContext.Provider>

    </BrowserRouter>

  );
}

export default App;
