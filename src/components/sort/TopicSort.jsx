import { useState, useEffect, useRef } from 'react';
import { Topic, Majors } from './sort.const';

export function TopicSort({ onSelect }) {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeClick = clickedType => {
    if (selectedType === clickedType) {
      setSelectedType('');
      onSelect(''); // 필터링 초기화
    } else {
      setSelectedType(clickedType);
      onSelect(clickedType); // 선택된 값 전달
    }
  };

  useEffect(() => {
    console.log(selectedType);
  }, [selectedType]);

  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const showModal = () => {
    setModalOpen(true);
  };

  function findTopic(topic) {
    const item = Topic.find(item => item.id === topic);
    return item ? item.topic : null;
  }

  return (
    <div>
      <div onClick={showModal} className="align-row" id={modalOpen ? 'selected-dd' : 'dropdown'}>
        {selectedType === '' ? <p>주제</p> : <p>{findTopic(selectedType)}</p>}
        <img src="/arrow.svg" />
      </div>
      {modalOpen && (
        <div ref={modalRef} id="select-modal">
          <div id="select-list">
            {Topic.map(({ id, topic }) => (
              <div
                onClick={() => handleTypeClick(id)}
                className={selectedType === id ? 'selected' : ''}
                id="select"
                key={id}>
                <p>{topic}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
