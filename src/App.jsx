import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Login, Register, ClubMain, ConfMain } from './components';
import { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (userId !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userId, loggedIn]);

  if (loggedIn === null) {
    return (
      <div id="load">
        <img src="/loading.gif" />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        {loggedIn ? <Route path="/" element={<ClubMain />} /> : <Route path="/" element={<Navigate to="/login" />} />}
        <Route path="/club" element={<ClubMain />} />
        <Route path="/conference" element={<ConfMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
