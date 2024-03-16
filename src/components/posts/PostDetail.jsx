import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './post.css';
import { ClubType, Subject, Topic } from '../sort';
import { calculateDday } from './Date';
import Linkify from 'linkify-react';

export function PostDetail({ postId, isClub, link }) {
  const [posts, setPosts] = useState('');
  const [bookmarked, setBookmark] = useState(false);

  const currentUserId = sessionStorage.getItem('userId');

  useEffect(() => {
    async function fetchPosts() {
      if (isClub) {
        try {
          const response = await axios.get(`/main/club/${postId}`);
          console.log(response.data);
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      } else {
        try {
          const response = await axios.get(`/main/conference/${postId}`);

          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    }

    fetchPosts();
  }, [isClub, postId, posts.postId]);

  async function Bookmark() {
    if (isClub) {
      try {
        const response = await axios.post(`/main/club/${postId}/bookmark`, currentUserId);
        console.log(response.data);
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
        <img src="/" onClick={Bookmark} id="bookmark" />
        <Link to={`${link}`} target="_blank">
          <button id="detail-button">지원하기</button>
        </Link>
      </div>
      <pre id="detail-body">
        <Linkify>{posts.body}</Linkify>
      </pre>
      <div className="align-row">
        {isClub ? (
          <img
            src={`https://ewhamoa-image-bucket.s3.ap-northeast-2.amazonaws.com/image/${postId}.jpg`}
            alt={`club${postId}`}
            id="detail-img"
          />
        ) : (
          <img
            src={`https://ewhamoa-image-bucket.s3.ap-northeast-2.amazonaws.com/image/conf${postId}.jpg`}
            alt={`conf${postId}`}
            id="detail-img"
          />
        )}
      </div>
    </div>
  );
}
