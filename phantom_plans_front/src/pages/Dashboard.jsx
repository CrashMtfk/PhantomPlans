import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function Dashboard() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const fetchUserName = async () => {
    const response = await fetch('http://localhost:3001/dashboard/profile', {method: 'GET', credentials: 'include' });
    const data = await response.json();
    setUserName(data);

  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const logoutUser = (event) => {
    event.preventDefault();
    axios.delete('http://localhost:3001/logout', {
      withCredentials: true
    }).then((res) => {
      localStorage.removeItem('accessToken');
      console.log(res.data);
      navigate('/');
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logoutUser}>Log Out</button>
      <p>Hello,{userName}</p>
    </div>
  )
}
