import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Login, Register } from './components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
