import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Login, Register, ClubMain, ConfMain } from './components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClubMain />} />
        <Route path="/club" element={<ClubMain />} />
        <Route path="/conference" element={<ConfMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
