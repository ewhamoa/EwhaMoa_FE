import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { SelectChat } from './SelectChat';
import { Ask } from './Ask';
import { Recommend } from './Recommend';
import { Instruction } from './Instruction';

export function Chatbot() {
  const [selectedValue, setSelectedValue] = useState(-1);
  const [moaTalking, setMoaTalking] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleSelectedValue = value => {
    setSelectedValue(value);
  };

  const [posts, setPosts] = useState('');
  const [sent, setSent] = useState(false);
  const [greetings, setGreetings] = useState(true);

  const [inputs, setInputs] = useState({
    messageType: selectedValue,
    message: '',
  });

  const { messageType, message } = inputs;

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
      setSent(true);
      console.error('Error fetching posts:', error);
    }
  }

  return (
    <div>
      <img src="/moa.webp" alt="moA" onClick={handleModalOpen} />
      {modalOpen && (
        <>
          <div id="moa">
            <SelectChat onSelect={handleSelectedValue} greetings={true} />
          </div>

          {selectedValue === 0 ? (
            <Recommend inputValue={message} posts={posts} sent={sent} />
          ) : selectedValue === 1 ? (
            <Ask message={message} posts={posts} sent={sent} />
          ) : selectedValue === 2 ? (
            <Instruction message={message} posts={posts} sent={sent} />
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
            <img src="/" onClick={fetchPosts} />
          </div>
        </>
      )}
    </div>
  );
}
