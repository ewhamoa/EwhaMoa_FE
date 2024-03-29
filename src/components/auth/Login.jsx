import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css';

export function Login() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState(true);

  const { email, password } = inputs;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });

      console.log(response);
      if (response.status === 200) {
        sessionStorage.setItem('userId', response.data);
        console.log('success');
        window.location.href = '/';
      }

      if (response.status === 300 || response.status === 400) {
        setSuccess(false);
        console.log('error');
      }
    } catch (error) {
      setSuccess(false);
      console.error('Login failed:', error);
    }
  };

  return (
    <div id="login-page-whole">
      <div id="login-left">
        <div id="login-page">
          <div id="login">
            <div id="welcome">
              <strong> 나에게 필요했던 공고, </strong>
              <strong> 이제 한눈에 모아보세요. </strong>
            </div>
            <div id="login-register">
              <form id="id-pw" onSubmit={handleSubmit}>
                <input
                  id="id"
                  type="text"
                  name="email"
                  placeholder="이메일"
                  value={email}
                  onChange={handleInputChange}
                />

                <input
                  id="pw"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={handleInputChange}
                />
                {!success && <span>아이디 또는 비밀번호를 확인하세요.</span>}
                <button type="submit" className="login-register-button" id="register-button">
                  로그인
                </button>
                <Link to="/signup">
                  <button type="submit" className="login-register-button">
                    회원가입
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="login-right">
        <img src="/login-right.svg" />
      </div>
    </div>
  );
}
