import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export function Header({ isClub }) {
  return (
    <div id="header-wrap">
      <div id="header">
        <Logo />
        <Link to="/conference" className="category" id={isClub ? null : 'underline'}>
          학회
        </Link>
        <Link to="/club" className="category" id={isClub ? 'underline' : null}>
          동아리
        </Link>
        <SearchBar />
      </div>
    </div>
  );
}
