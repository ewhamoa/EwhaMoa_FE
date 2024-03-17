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
    addElement();
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

  function handleModalOpen() {
    return setModalOpen(true);
  }

  function handleModalClose() {
    return setModalOpen(false);
  }

  const [elements, setElements] = useState([]);

  // 새로운 요소를 추가하는 함수

  const renderChatElements = () => {
    return (
      <>
        {selectedValue === 0 ? (
          <Recommend
            key={selectedValue}
            inputValue={message}
            posts={posts}
            sent={sent}
            onSelect={handleSelectedValue}
          />
        ) : selectedValue === 1 ? (
          <Ask key={selectedValue} message={message} posts={posts} sent={sent} onSelect={handleSelectedValue} />
        ) : selectedValue === 2 ? (
          <Instruction key={selectedValue} message={message} posts={posts} sent={sent} onSelect={handleSelectedValue} />
        ) : null}
      </>
    );
  };

  const addElement = () => {
    // 현재 요소 배열을 복사하여 새로운 요소를 추가합니다.
    setElements(prevElements => [...prevElements, renderChatElements()]);
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
  }, [renderChatElements()]);

  return (
    <div id="chatbot">
      <div id="moa-container">
        {!modalOpen ? (
          <>
            <img src="/moa.webp" alt="챗봇 모아(moA)" onClick={handleModalOpen} />
            <p id="hover-text">도와드릴까요?</p>
          </>
        ) : null}{' '}
        {modalOpen ? (
          <img id="close" style={{ bottom: '48px' }} src="/close.svg" alt="moA" onClick={handleModalClose} />
        ) : null}
      </div>

      {modalOpen && (
        <>
          <div id="select-modal" ref={modalRef}>
            <div id="chat-container">
              <div>
                <SelectChat onSelect={handleSelectedValue} greetings={true} />
              </div>
              {elements}
              {renderChatElements()}
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
        </>
      )}
    </div>
  );
}
