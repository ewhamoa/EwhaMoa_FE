import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

export function Header({ isClub, onSearch, searchClear }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // 검색어를 ParentComponent로 전달
  };
  return (
    <div id="header-wrap">
      <div className="space-between">
        <div id="header">
          <Logo />
          <Link to="/conference" className="category" id={isClub ? null : 'underline'}>
            학회
          </Link>
          <Link to="/club" className="category" id={isClub ? 'underline' : null}>
            동아리
          </Link>
        </div>
        <SearchBar value={searchTerm} onChange={handleSearchChange} searchClear={searchClear} />
      </div>
    </div>
  );
}
