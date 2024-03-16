import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { PostDetail } from './PostDetail';
import { calculateDday, formatDate } from './Date';

export function PostItem({ postId, title, body, createdAt, due, link, isClub, isChatbot, groupName, imageLink }) {
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
    <div id={isChatbot ? 'chatbot-item' : 'post-item'} onClick={showModal}>
      {!isChatbot && (
        <div className="badge">
          <p>D-{calculateDday(due)}</p>
        </div>
      )}
      <div className="align-column">
        <img src={imageLink} alt={`${postId}`} id="item-img" />

        <div id="item-text">
          <h3>{title}</h3>
          {isChatbot && <p>{groupName}</p>}
          <p id="item-body">{body}</p>
        </div>
        {!isChatbot && (
          <div className="align-row">
            <p id="date">{formatDate(createdAt)}</p>
            {link !== null ? (
              <Link to={`${link}`} target="_blank">
                <button>지원하기</button>
              </Link>
            ) : (
              <button disabled id="disabled">
                지원하기
              </button>
            )}
          </div>
        )}
      </div>
      {modalOpen && (
        <div id="modal-wrap">
          <div id="detail-modal" ref={modalRef}>
            <PostDetail postId={postId} isClub={isClub} link={link} />
          </div>
        </div>
      )}
    </div>
  );
}
