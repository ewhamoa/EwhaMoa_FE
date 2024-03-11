import { useState, useEffect, useRef } from 'react';
import { Who } from './sort.const';

export function WhoSort({ onSelect }) {
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
      <div onClick={showModal}>
        <p>모집 대상</p> <img src="/arrow.svg" />
      </div>
      {modalOpen && (
        <div ref={modalRef}>
          {Who.map(({ id, who }) => (
            <div
              onClick={() => handleTypeClick(id)}
              className={selectedType === id ? 'selected' : ''}
              id="clickAvailable"
              key={id}>
              <p>{who}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
