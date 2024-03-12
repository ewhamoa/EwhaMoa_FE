import { useState, useEffect, useRef } from 'react';
import { Topic } from './sort.const';

export function SubjectSort({ onSelect }) {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeClick = clickedType => {
    setSelectedType(prevSelected => (prevSelected === clickedType ? '' : clickedType));
    onSelect(clickedType);
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

  return (
    <div>
      <div onClick={showModal} className="align-row">
        <p>주제</p>
        <img src="/arrow.svg" />
      </div>
      {modalOpen && (
        <div ref={modalRef}>
          {Topic.map(({ id, topic }) => (
            <div
              onClick={() => handleTypeClick(id)}
              className={selectedType === id ? 'selected' : ''}
              id="clickAvailable"
              key={id}>
              <p>{topic}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
