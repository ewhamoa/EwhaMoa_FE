import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { PostDetail } from './PostDetail';
import { calculateDday, formatDate } from './Date';
import axios from 'axios';

export function PostItem({
  postId,
  title,
  body,
  createdAt,
  due,
  link,
  isClub,
  isChatbot,
  groupName,
  imageLink,
  isBookmarked,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookmarked, setBookmark] = useState(false);

  const currentUserId = parseInt(sessionStorage.getItem('userId'));

  useEffect(() => {
    setBookmark(isBookmarked);
  }, [isBookmarked]);

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

  async function Bookmark(e) {
    e.preventDefault();
    if (isClub) {
      try {
        const response = await axios.post(`/main/club/${postId}/bookmark`, currentUserId);
        console.log(response.data);

        setBookmark(prevBookmarked => !prevBookmarked);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    } else {
      try {
        const response = await axios.post(`/main/conference/${postId}/bookmark`, currentUserId);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  }

  return (
    <div id={isChatbot ? 'chatbot-item' : 'post-item'}>
      {!isChatbot && (
        <div className="badge">
          <p>D-{calculateDday(due)}</p>
        </div>
      )}
      <div className="align-column">
        {imageLink !== null && imageLink !== '' ? (
          <img src={imageLink} alt={`${postId}`} id="item-img" onClick={showModal} />
        ) : (
          <img src="/basic.png" alt={`${postId}`} id="item-img" onClick={showModal} />
        )}

        <div id="item-text" onClick={showModal}>
          <h3>{title}</h3>
          {isChatbot && <p>{groupName}</p>}
          <p id="item-body">{body}</p>
        </div>

        {!isChatbot && (
          <div className="align-row">
            <p id="date" onClick={showModal}>
              {formatDate(createdAt)}
            </p>
            {bookmarked ? (
              <div id="bookmark">
                <img src="/bookmarked.svg" onClick={Bookmark} />
              </div>
            ) : (
              <div id="bookmark">
                <img src="/not-bookmarked.svg" onClick={Bookmark} />
              </div>
            )}
            {link === 'disable' ? null : link !== null ? (
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
            <PostDetail postId={postId} isClub={isClub} link={link} setModalOpen={setModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
}
