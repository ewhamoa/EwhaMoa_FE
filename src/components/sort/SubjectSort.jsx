import { useState, useEffect, useRef } from 'react';
import { Subject } from './sort.const';

export function SubjectSort({ onSelect }) {
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

  const showModal = () => {
    setModalOpen(true);
  };

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

  function findSubject(subject) {
    const item = Subject.find(item => item.id === subject);
    return item ? item.sub : null;
  }

  return (
    <div>
      <div onClick={showModal} className="align-row" id={modalOpen ? 'selected-dd' : 'dropdown'}>
        {selectedType === '' ? <p>주제</p> : <p>{findSubject(selectedType)}</p>}
        <img src="/arrow.svg" />
      </div>
      {modalOpen && (
        <div ref={modalRef} id="select-modal">
          <div id="select-list">
            {Subject.map(({ id, sub }) => (
              <div
                onClick={() => handleTypeClick(id)}
                className={selectedType === id ? 'selected' : ''}
                id="select"
                key={id}>
                <p id="filter-button">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
