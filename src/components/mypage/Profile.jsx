import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './mypage.css';

export function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();
  const [profile, setProfile] = useState('');

  async function fetchProfile() {
    try {
      const response = await axios.get('/user/profile');
      console.log(response.data);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  const showModal = () => {
    setModalOpen(true);
    fetchProfile();
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

  return (
    <div id="profile-wrap">
      <img src="/profile-pic.png" onClick={showModal} id="prof-pic" />

      {modalOpen && (
        <div id="profile-modal" ref={modalRef}>
          <div id="profile2" className="align-row">
            <img src="/profile-pic.png" />
            <div className="align-column">
              <p id="nickname">{profile.nickname}</p>
              <p id="prof-email">{profile.email}</p>
            </div>
          </div>
          <div id="index">
            <Link to="/bookmarks" className="align-row" id="navigate">
              <img src="/book.png" />
              <p>내가 북마크한 글</p>
            </Link>
            <Link to="/myposts" className="align-row" id="navigate">
              <img src="/write.png" />
              <p>내가 작성한 글</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
