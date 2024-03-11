import { ClubType, Majors, Dept } from './sort.const';
import { useState, useEffect, useRef } from 'react';

export function TypeSort({ onSelect }) {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeClick = clickedType => {
    setSelectedType(prevSelected => (prevSelected === clickedType ? '' : clickedType));
    onSelect(clickedType);
  };

  useEffect(() => {
    console.log(selectedType.type);
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
        <p>소속</p> <img src="/arrow.svg" />
      </div>
      {modalOpen && (
        <>
          <div ref={modalRef}>
            {ClubType.map(({ id, type }) => (
              <div
                onClick={() => handleTypeClick(id)}
                className={selectedType === id ? 'selected' : ''}
                id="clickAvailable"
                key={id}>
                <p>{type}</p>
              </div>
            ))}
          </div>

          {selectedType === 1 ? (
            <div>
              {Majors.map(major => (
                <div
                  onClick={() => handleTypeClick(major)}
                  className={selectedType === major ? 'selected' : ''}
                  id="clickAvailable"
                  key={major}>
                  <p>{major}</p>
                </div>
              ))}
            </div>
          ) : null}
          {selectedType === 2 ? (
            <div>
              {Dept.map(dept => (
                <div
                  onClick={() => handleTypeClick(dept)}
                  className={selectedType === dept ? 'selected' : ''}
                  id="clickAvailable"
                  key={dept}>
                  <p>{dept}</p>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
