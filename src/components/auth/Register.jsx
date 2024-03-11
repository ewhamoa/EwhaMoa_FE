import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../main/Logo';
import axios from 'axios';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    account: '',
    bank: '',
  });

  const [emailValid, setEmailValid] = useState(true);
  const [emailExists, setEmailExists] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [nickname, setNick] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!emailValid) {
      return;
    }

    try {
      const response = await axios.post('/signup', formData);

      setIsSnackbarOpen(true);
      sessionStorage.setItem('userId', response.data.userId);
      sessionStorage.setItem('IsRegistered', true);
      setNick(response.data.nickname);

      setTimeout(() => {
        setIsSnackbarOpen(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      setEmailExists(error.response.data !== '이미 존재하는 이메일입니다.');
      setEmailValid(error.response.data !== '유효하지 않은 이메일입니다.');
    }
  };

  return (
    <>
      <div style={{ paddingLeft: '100px', borderBottom: '1px solid #eee' }}>
        <Logo />
      </div>
      <div id="register-box">
        <div id="register">
          <div id="register-title">
            <h1>회원가입</h1>
          </div>
          <form onSubmit={handleSubmit} id="register-form">
            <div>
              <label>이화인 이메일</label>
              <input
                id="id"
                type="email"
                name="email"
                value={formData.email}
                placeholder="@ewhain.net"
                onChange={handleChange}
                required
              />
              {!emailValid && <span>이화인 이메일을 입력하세요.</span>}
              {!emailExists && <span>이미 존재하는 이메일입니다.</span>}
            </div>
            <div>
              <label>비밀번호</label>
              <input
                id="pw"
                type="password"
                name="password"
                value={formData.password}
                placeholder="알파벳과 숫자만 입력"
                onChange={handleChange}
                required
              />
            </div>

            {!emailValid && <span>입력한 정보를 확인하세요.</span>}
            <button type="submit" id="register-submit">
              회원가입
            </button>
          </form>
        </div>
      </div>
      {isSnackbarOpen && (
        <div className="snackbar">
          <button onClick={handleSnackbarClose} id="x">
            x
          </button>
          {nickname}님, 환영합니다.
        </div>
      )}
    </>
  );
};
