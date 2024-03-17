import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './post.css';
import { ClubType, Subject, Topic } from '../sort';
import { EditPost } from './PostEdit';
import { calculateDday } from './Date';
import Linkify from 'linkify-react';

export function PostDetail({ postId, isClub, link, setModalOpen }) {
  const [posts, setPosts] = useState('');
  const [bookmarked, setBookmark] = useState(false);

  const currentUserId = parseInt(sessionStorage.getItem('userId'));

  useEffect(() => {
    async function fetchPosts() {
      if (isClub) {
        try {
          const response = await axios.get(`/main/club/${postId}`);
          console.log(response.data);
          setPosts(response.data);
          setIsWriter(currentUserId === response.data.userId);
          setBookmark(response.data.bookmarked);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      } else {
        try {
          const response = await axios.get(`/main/conference/${postId}`);
          setIsWriter(currentUserId === response.data.userId);
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    }

    fetchPosts();
  }, [isClub, postId, posts.postId, posts.isBookmarked]);

  const [isWriter, setIsWriter] = useState(false);

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

  useEffect(() => {
    setBookmark(posts.isBookmarked);
  }, [posts.isBookmarked]);

  function findType(type) {
    const item = ClubType.find(item => item.id === type);
    return item ? item.type : '중앙, 연합';
  }

  function findSubject(subject) {
    const item = Subject.find(item => item.id === subject);
    return item ? item.sub : null;
  }

  function findTopic(topic) {
    const item = Topic.find(item => item.id === topic);
    return item ? item.topic : null;
  }

  function findWho(who) {
    if (who === 1) {
      return '24학번';
    } else if (who === 2) {
      return '24학번, 23학번';
    } else if (who === 3) {
      return '24학번, 23학번, 22학번';
    } else if (who === 4) {
      return '누구나';
    } else {
      return '23학번 이상';
    }
  }

  const [deleteOpen, setDeleteOpen] = useState(false);

  function deleteCheck() {
    setDeleteOpen(true);
  }

  const handleDelete = async e => {
    e.preventDefault();

    if (isClub) {
      try {
        const response = await axios.delete(`/main/club/${postId}/delete`);
        console.log(response.data);
        setModalOpen(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    } else {
      try {
        const response = await axios.delete(`/main/conference/${postId}/delete`);
        console.log(response.data);
        setModalOpen(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  };

  const [editOpen, setEditOpen] = useState(false);

  function handleEdit() {
    setEditOpen(true);
  }

  return (
    <div className="align-column">
      <div className="align-row">
        <div className="align-column">
          <div id="title-dday" className="align-row">
            <h3 id="detail-title">{posts.title}</h3>
            <p className="badge">D-{calculateDday(posts.due)}</p>
          </div>
          <div className="align-row" id="category">
            <p>{posts.groupName}</p>
            <p>|</p>
            <p>{findType(posts.affiliationType)}</p>
            <p>|</p>
            <p>{isClub ? '동아리' : '학회'}</p>
            <p>|</p>
            <p>{findWho(posts.grade)}</p>
            <p>|</p>
            <p>{isClub ? findSubject(posts.topic) : findTopic(posts.topic)}</p>
          </div>
        </div>
        {isWriter ? (
          <>
            <div className="align-row" id="edit-delete">
              {isClub ? (
                <Link to={`/edit/club/${postId}`} id="edit-button">
                  수정
                </Link>
              ) : null}{' '}
              {!isClub ? (
                <Link to={`/edit/conference/${postId}`} id="edit-button">
                  수정
                </Link>
              ) : null}
              <p onClick={() => setDeleteOpen(true)} id="delete-button">
                삭제
              </p>
              {deleteOpen ? (
                <div id="modal-wrap">
                  <div id="delete-modal">
                    정말 삭제하시겠어요?
                    <div className="align-row">
                      <div onClick={handleDelete} id="yes">
                        예
                      </div>
                      <div onClick={() => setDeleteOpen(false)} id="no">
                        아니오
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <>
            {!bookmarked && (
              <div id="detail-button" className="align-row" onClick={Bookmark}>
                <img key="not-bookmarked" src="/not-bookmarked.svg" />
                <p>저장하기</p>
              </div>
            )}
            {bookmarked && (
              <div id="detail-button" className="align-row" onClick={Bookmark}>
                <img key="bookmarked" src="/bookmarked.svg" />
                <p>저장됨</p>
              </div>
            )}
          </>
        )}
      </div>
      <pre id="detail-body">
        <Linkify>{posts.body}</Linkify>
      </pre>
      <div className="align-row">
        {posts.imageLink !== null && posts.imageLink !== '' ? (
          <img src={posts.imageLink} alt={`${postId}`} id="detail-img" />
        ) : (
          <img src="/basic.png" alt={`${postId}`} id="detail-img" />
        )}
      </div>
    </div>
  );
}
