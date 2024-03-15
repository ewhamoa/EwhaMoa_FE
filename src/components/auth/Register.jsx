import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const navigate = useNavigate();
  const [emailCode, setEmailCode] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailValid, setEmailValid] = useState(true);
  const [emailExists, setEmailExists] = useState(true);
  const [showNull, setShowNull] = useState(false);
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

    if (formData.email === '' || emailCode === '' || formData.password === '') {
      setShowNull(true);
    }

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
      console.log(error.response.data);
      setEmailExists(error.response.data !== '이미 존재하는 이메일입니다.');
      setEmailValid(error.response.data !== '유효하지 않은 이메일입니다.');
    }
  };

  const handleSendCode = async e => {
    e.preventDefault();
    try {
      await axios.post('/signup/check', { email: formData.email });
      // 인증 코드를 성공적으로 보냈음을 사용자에게 알림
      alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  const handleVerifyCode = async e => {
    e.preventDefault();
    try {
      await axios.post('/signup/verify', { email: formData.email, code: emailCode });

      alert('인증 코드가 확인되었습니다.');
    } catch (error) {
      console.error('Error verifying code:', error);

      alert('인증 코드가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <div id="login-page-whole">
        <div id="login-left">
          <div id="login-page">
            <div id="login">
              <div id="welcome">
                <h1>회원가입</h1>
              </div>
              <div id="login-register">
                <form onSubmit={handleSubmit} id="id-pw">
                  <div className="register-input">
                    <input
                      id="id"
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="이메일"
                      onChange={handleChange}
                    />
                    <button onClick={handleSendCode} id="verify">
                      전송
                    </button>
                  </div>
                  {!emailValid && <span>이화인 이메일을 입력하세요.</span>}
                  {!emailExists && <span>이미 존재하는 이메일입니다.</span>}
                  <div className="register-input">
                    <input
                      id="code"
                      type="text"
                      name="code"
                      value={emailCode}
                      placeholder="인증코드를 입력"
                      onChange={e => setEmailCode(e.target.value)}
                    />
                    <button onClick={handleVerifyCode} id="verify2">
                      인증
                    </button>
                  </div>

                  <input
                    id="pw"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="비밀번호"
                    onChange={handleChange}
                  />

                  {!emailValid && <span>입력한 정보를 확인하세요.</span>}
                  {showNull && <span>필수 항목을 입력하세요.</span>}
                  <button type="submit" className="login-register-button">
                    회원가입
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div id="login-right">
          <img src="/login-right.svg" />
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
