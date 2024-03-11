import { ClubType, Majors, Dept } from './sort.const';
import { useState, useEffect, useRef } from 'react';

export function TypeSort({ onSelect, onMajorSelect, onDeptSelect }) {
  const [selectedType, setSelectedType] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  const handleTypeClick = clickedType => {
    setSelectedType(prevSelected => (prevSelected === clickedType ? '' : clickedType));
    onSelect(clickedType);
  };

  const handleMajorTypeClick = clickedMajor => {
    setSelectedMajor(prevSelected => (prevSelected === clickedMajor ? '' : clickedMajor));
    onMajorSelect(clickedMajor);
  };

  const handleDeptTypeClick = clickedMajor => {
    setSelectedMajor(prevSelected => (prevSelected === clickedMajor ? '' : clickedMajor));
    onDeptSelect(clickedMajor);
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
      <div onClick={showModal} className="align-row">
        <p>소속</p> <img src="/arrow.svg" />
      </div>
      {modalOpen && (
        <div ref={modalRef}>
          <div>
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
                  onClick={() => handleMajorTypeClick(major)}
                  className={selectedMajor === major ? 'selected' : ''}
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
                  onClick={() => handleDeptTypeClick(dept)}
                  className={selectedDept === dept ? 'selected' : ''}
                  id="clickAvailable"
                  key={dept}>
                  <p>{dept}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
