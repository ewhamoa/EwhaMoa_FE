import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { Profile } from '../mypage';

export function Header({ isClub, onSearch, searchClear }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  return (
    <div id="header-wrap">
      <div className="space-between">
        <div id="header">
          <Logo />
          <Link to="/conference" className="category" id={isClub ? null : isClub === undefined ? null : 'underline'}>
            학회
          </Link>
          <Link to="/club" className="category" id={isClub ? 'underline' : null}>
            동아리
          </Link>
        </div>
        <div className="align-row" id="profile-search">
          <SearchBar value={searchTerm} onChange={handleSearchChange} searchClear={searchClear} />
          <Link to="/write" id="write-header">
            새 글 쓰기
          </Link>
          <Profile />
        </div>
      </div>
    </div>
  );
}
