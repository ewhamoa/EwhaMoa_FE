import { useState, useEffect, useRef } from 'react';
import { Who } from './sort.const';

export function WhoSort({ onSelect }) {
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

  function findWho(who) {
    const item = Who.find(item => item.id === who);
    return item ? item.who : null;
  }

  return (
    <div>
      <div onClick={showModal} className="align-row" id={modalOpen ? 'selected-dd' : 'dropdown'}>
        {selectedType === '' ? <p>모집 대상</p> : <p>{findWho(selectedType)}</p>} <img src="/arrow.svg" />
      </div>
      {modalOpen && (
        <div ref={modalRef} id="select-modal">
          <div id="select-list">
            {Who.map(({ id, who }) => (
              <div
                onClick={() => handleTypeClick(id)}
                className={selectedType === id ? 'selected' : ''}
                id="select"
                key={id}>
                <p>{who}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
