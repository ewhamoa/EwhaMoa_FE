import { ClubType, Majors, Dept } from './sort.const';
import { useState, useEffect, useRef } from 'react';
import { TypeSearch } from './TypeSearch';
import './sort.css';

export function TypeSort({ onSelect, onMajorSelect }) {
  const [selectedType, setSelectedType] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');

  const handleTypeClick = clickedType => {
    if (selectedType === clickedType) {
      setSelectedType('');
      onSelect(''); // 필터링 초기화
    } else {
      setSelectedType(clickedType);
      onSelect(clickedType); // 선택된 값 전달
    }
  };

  const handleMajorTypeClick = clickedMajor => {
    if (selectedMajor === clickedMajor) {
      setSelectedMajor('');
      onMajorSelect(''); // 필터링 초기화
    } else {
      setSelectedMajor(clickedMajor);
      onMajorSelect(clickedMajor); // 선택된 값 전달
    }
  };

  useEffect(() => {
    console.log(selectedType);
    console.log(selectedMajor);
  }, [selectedMajor, selectedType]);

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

  useEffect(() => {
    setSelectedMajor('');
  }, [selectedType]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const FilteredMajor = Majors.filter(major => (searchTerm !== '' ? major.includes(searchTerm) : true));

  function findType(type) {
    const item = ClubType.find(item => item.id === type);
    return item ? item.type : null;
  }

  return (
    <div>
      <div onClick={showModal} className="align-row" id={modalOpen ? 'selected-dd' : 'dropdown'}>
        {selectedType === '' ? (
          <p>소속</p>
        ) : selectedMajor === '' ? (
          <p>{findType(selectedType)}</p>
        ) : (
          <p>{selectedMajor}</p>
        )}{' '}
        <img src="/arrow.svg" />
      </div>
      {modalOpen && (
        <div ref={modalRef} id="select-modal">
          <div id="select-list">
            {ClubType.map(({ id, type }) => (
              <div
                onClick={() => handleTypeClick(id)}
                className={selectedType === id ? 'selected' : ''}
                id="select"
                key={id}>
                <p>{type}</p>
              </div>
            ))}
          </div>

          {selectedType === 1 ? (
            <div id="line">
              <TypeSearch value={searchTerm} onChange={handleSearchChange} />
              <div id="select-list">
                {FilteredMajor.map(major => (
                  <div
                    onClick={() => handleMajorTypeClick(major)}
                    className={selectedMajor === major ? 'selected' : ''}
                    id="select"
                    key={major}>
                    <p>{major}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {selectedType === 2 ? (
            <div id="line">
              <div id="select-list">
                {Dept.map(dept => (
                  <div
                    onClick={() => handleMajorTypeClick(dept)}
                    className={selectedMajor === dept ? 'selected' : ''}
                    id="select"
                    key={dept}>
                    <p>{dept}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
