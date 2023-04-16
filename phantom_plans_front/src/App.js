import './App.css';
import Home from './pages/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route exact path="/signup" element = {<Signup/>}/>
        <Route exact path="/login" element = {<Login/>}/>
      </Routes>
      </Router>

    </div>
  );
}

export default App;
