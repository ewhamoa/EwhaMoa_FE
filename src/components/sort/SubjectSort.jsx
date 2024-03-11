import { useState, useEffect, useRef } from 'react';
import { Subject } from './sort.const';

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
          {Subject.map(({ id, sub }) => (
            <div
              onClick={() => handleTypeClick(id)}
              className={selectedType === id ? 'selected' : ''}
              id="clickAvailable"
              key={id}>
              <p>{sub}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
