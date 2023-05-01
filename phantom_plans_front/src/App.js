import './App.css';
import Home from './pages/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Pomodoro from './pages/Pomodoro';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login setUser={setUser} />} />
          {
            user && <Route exact path='/profile' element={<Profile user={user} />} />
          }
          {
            user && <Route exact path='/tasks' element={<Tasks user={user} />}/>
          }
          {
            user && <Route exact path='/pomodoro' element={<Pomodoro user={user} />} />
          }
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
