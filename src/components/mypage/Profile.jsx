import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();
  const [profile, setProfile] = useState('');

  async function fetchPosts() {
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
    <div>
      <img src="/profile-pic.png" onClick={showModal} />
      <p>{profile.email}</p>
      <p>{profile.nickname}</p>
      {modalOpen && (
        <div id="select-modal" ref={modalRef}>
          <div id="profile">
            <img src="/profile-pic.png" />
          </div>
          <Link to="/bookmarks">
            <img src="/book.png" />
            <p>내가 북마크한 글</p>
          </Link>
          <Link to="/myposts">
            <img src="/write.png" />
            <p>내가 작성한 글</p>
          </Link>
        </div>
      )}
    </div>
  );
}
