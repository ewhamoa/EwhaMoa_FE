import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Login, Register, ClubMain, Test } from './components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClubMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
