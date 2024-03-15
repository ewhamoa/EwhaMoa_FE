import { useState, useEffect, useRef } from 'react';
import { Majors } from './sort.const';

export function TypeSearch({ value, onChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleValue = () => {
      setSearchTerm(value);
    };
    handleValue();
  }, [value]);

  return (
    <div>
      <div id="search-major">
        <div id="search-box">
          <img src="/searchmajor.svg" id="major-img" />
          <input
            type="text"
            placeholder="찾으시는 검색어를 입력해 보세요"
            value={value}
            onChange={onChange}
            id="search-input"
          />
        </div>
      </div>
    </div>
  );
}
