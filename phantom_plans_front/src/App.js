import './App.css';
import Home from './pages/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          {
             user ? (
              <Route exact path='/dashboard' element={<Dashboard user = {user} />} />
             ) : (
              <Route exact path="/login" element={<Login setUser={setUser} />} />
             )}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
