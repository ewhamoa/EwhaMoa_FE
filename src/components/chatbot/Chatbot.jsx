import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { SelectChat } from './SelectChat';
import { Ask } from './Ask';
import { Recommend } from './Recommend';
import { Instruction } from './Instruction';
import './chatbot.css';

export function Chatbot() {
  const [selectedValue, setSelectedValue] = useState();
  const [messageType, setMessageType] = useState();

  useEffect(() => {
    setMessageType(selectedValue); // selectedValue 변경 시에 messageType 갱신
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

  async function fetchPosts() {
    try {
      const response = await axios.post('/chat/send', { messageType, message });
      console.log(response.data);
      setPosts(response);
      setSent(true);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setSent(true);
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
              <SelectChat onSelect={handleSelectedValue} greetings={true} />
            </div>

            {selectedValue === 0 ? (
              <Recommend inputValue={message} posts={posts} sent={sent} />
            ) : selectedValue === 1 ? (
              <Ask message={message} posts={posts} sent={sent} />
            ) : selectedValue === 2 ? (
              <Instruction message={message} posts={posts} sent={sent} />
            ) : null}
          </div>

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
