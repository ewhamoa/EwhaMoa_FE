import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Login, Register, ClubMain, ConfMain, WritePost, Bookmarks, MyPosts } from './components';
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
        <Route path="/write" element={<WritePost />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/myposts" element={<MyPosts />} />
      </Routes>
    </div>
  );
}

export default App;
