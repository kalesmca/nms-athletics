import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerListComponent from './container/player-list/playerListComponent';
import PlayerRegistration from './container/registration/playerRegistration';
import PlayerDashboard from './container/player-dashboard/playerDashboard';
import LayoutContainer from './container/layout/layoutContainer';
import LoginComponent from './container/login/loginComponent';
import NotFoundComponent from './container/notFound/notFoundComponent';
function App() {
  return (
    <BrowserRouter >
        <Routes>
          <Route path="/" element={<LayoutContainer />}>
                <Route index element={<LoginComponent />} />
                <Route path="player-list" element={<PlayerListComponent />} />
                <Route path="registration" element={<PlayerRegistration />} />
                <Route path="dashboard" element={<PlayerDashboard />} />
                <Route path="*" element={<NotFoundComponent />} />
                
          </Route>

        </Routes>

    </BrowserRouter>

  );
}

export default App;
