import { useState, useEffect, useRef } from 'react';

export function SearchBar({ value, onChange, searchClear }) {
  const [isSearchbarOpen, setSearchbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [click, setClick] = useState(false);

  const [modalOpen, setModalOpen] = useState(isSearchbarOpen);
  const modalRef = useRef();

  useEffect(() => {
    const handleValue = () => {
      setSearchTerm(value);
    };
    handleValue();
  }, [value]);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setClick(true);
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

  const handleSearchbar = () => {
    setModalOpen(true);
    setClick(false);
    console.log(value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      setModalOpen(false);
    }
  };

  const clearValue = () => {
    value = '';
    setClick(true);
  };

  return (
    <div id="search">
      {value === '' || click ? (
        <img src="/search.svg" onClick={handleSearchbar} />
      ) : (
        <div onClick={searchClear} id="clear">
          <div onClick={clearValue}>{searchTerm} </div>
          <div onClick={clearValue}>x</div>
        </div>
      )}
      {modalOpen && (
        <div id="modal-wrap">
          <div ref={modalRef}>
            <div id="search-modal">
              <div id="search-box">
                <img src="/search.svg" />
                <input
                  type="text"
                  placeholder="찾으시는 검색어를 입력해 보세요"
                  value={value}
                  onChange={onChange}
                  onKeyPress={handleKeyPress}
                  id="search-input"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
