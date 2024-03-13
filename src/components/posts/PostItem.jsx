import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { PostDetail } from './PostDetail';

export function PostItem({ postId, title, body, createdAt, due, link, isClub }) {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

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
  return (
    <div id="post-item" onClick={showModal}>
      <div className="badge">
        <p>D-{due}</p>
      </div>
      <div className="align-column">
        {isClub ? (
          <img src={`/club-img/${postId}.jpg`} alt={`club${postId}`} />
        ) : (
          <img src={`/club-img/conf${postId}.jpg`} alt={`conf${postId}`} />
        )}
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="align-row">
          <p>{createdAt}</p>
          {link !== null ? (
            <Link to={`${link}`} target="_blank">
              <button>지원하기</button>
            </Link>
          ) : null}
        </div>
      </div>
      {modalOpen && <PostDetail postId={postId} isClub={isClub} link={link} />}
    </div>
  );
}
