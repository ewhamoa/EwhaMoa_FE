import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { SelectChat } from './SelectChat';
import { Ask } from './Ask';
import { Recommend } from './Recommend';
import { Instruction } from './Instruction';
import { AnythingElse } from './AnythingElse';
import './chatbot.css';

export function Chatbot() {
  const [selectedValue, setSelectedValue] = useState();
  const [messageType, setMessageType] = useState();

  useEffect(() => {
    setMessageType(selectedValue);
  }, [selectedValue]);

  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();

  const handleSelectedValue = value => {
    setSelectedValue(value);
    setSent(false);
  };

  const [posts, setPosts] = useState('');
  const [sent, setSent] = useState(false);

  const [inputs, setInputs] = useState({
    message: '',
  });

  const { message } = inputs;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const [errorM, setErrorM] = useState(false);

  async function fetchPosts() {
    try {
      const response = await axios.post('/chat/send', { messageType, message });
      console.log(response.data);
      setPosts(response.data);
      setSent(true);
    } catch (error) {
      console.log(error.response.data);
      setErrorM(error.response.data === '답변 생성에 실패했습니다.');
    }
  }

  function scrollToBottomOfModal() {
    if (modalRef.current) {
      modalRef.current.scrollTop = modalRef.current.scrollHeight;
    }
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    scrollToBottomOfModal(); // 모달이 열릴 때마다 맨 아래로 스크롤
    const handleOutsideClick = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [messageType]);

  return (
    <div id="chatbot">
      <img src="/moa.webp" alt="moA" onClick={handleModalOpen} />
      {modalOpen && (
        <div id="select-modal" ref={modalRef}>
          <div id="chat-container">
            <div>
              <SelectChat onSelect={setSelectedValue} greetings={true} />
            </div>

            {selectedValue === 0 ? (
              <Recommend
                key={selectedValue}
                inputValue={message}
                posts={posts}
                sent={sent}
                onSelect={setSelectedValue}
              />
            ) : selectedValue === 1 ? (
              <Ask key={selectedValue} message={message} posts={posts} sent={sent} onSelect={setSelectedValue} />
            ) : selectedValue === 2 ? (
              <Instruction
                key={selectedValue}
                message={message}
                posts={posts}
                sent={sent}
                onSelect={setSelectedValue}
              />
            ) : null}
          </div>

          {errorM ? (
            <>
              <p id="moa">답변 생성에 실패했습니다.</p>{' '}
              <AnythingElse message={message} posts={posts} sent={sent} onSelect={handleSelectedValue} />
            </>
          ) : null}

          <div id="chat-input">
            <input
              id="id"
              type="text"
              name="message"
              placeholder="메세지를 입력하세요"
              value={message}
              onChange={handleInputChange}
            />
            <img src="/send.svg" onClick={fetchPosts} id="send" />
          </div>
        </div>
      )}
    </div>
  );
}
