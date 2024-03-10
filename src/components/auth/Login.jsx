import { useState } from 'react';
import axios from 'a';
import Logo from '../main/Logo';
import Link from 'react-router-dom';

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
        <div id="logo" style={{ marginLeft: '100px' }}>
          <Logo />
        </div>
        <div id="login-page">
          <div id="login">
            <div id="welcome">
              <strong> 어서오세요!</strong>
              공유 배달 시스템 '이화 공유배달'에 오신 것을 환영합니다.
            </div>
            <div id="login-register">
              <form id="id-pw" onSubmit={handleSubmit}>
                <p>이메일</p>
                <input
                  id="id"
                  type="text"
                  name="email"
                  placeholder="@ewhain.net"
                  value={email}
                  onChange={handleInputChange}
                />
                <p>비밀번호</p>
                <input
                  id="pw"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={handleInputChange}
                />
                {!success && <span>아이디 또는 비밀번호를 확인하세요.</span>}
                <button type="submit" id="login-button">
                  로그인
                </button>
              </form>
              <Link to="/register" id="register-button">
                <p>아직 계정이 없으신가요?</p> <div id="green">회원가입</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="login-right">
        <img src="/assets/login-right-img.svg" id="login-right-img" alt="Login" />
      </div>
    </div>
  );
}
