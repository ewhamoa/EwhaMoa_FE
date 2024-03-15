import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './post.css';
import { ClubType, Subject, Topic } from '../sort';

export function PostDetail({ postId, isClub, link }) {
  const [posts, setPosts] = useState('');

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

  return (
    <div className="align-column">
      <div className="align-row">
        <div className="align-column" id="category">
          <h3>{posts.title}</h3>
          <div className="align-row">
            <p>{posts.groupName}</p>
            <p>|</p>
            <p>{findType(posts.affiliationType)}</p>
            <p>|</p>
            <p>{isClub ? '동아리' : '학회'}</p>
            <p>|</p>
            <p>{posts.grade}</p>
            <p>|</p>
            <p>{isClub ? findSubject(posts.topic) : findTopic(posts.topic)}</p>
          </div>
        </div>
        <Link to={`${link}`} target="_blank">
          <button>지원하기</button>
        </Link>
      </div>
      <p>{posts.body}</p>
      <div className="align-row">
        <p>{posts.createdAt}</p>

        {isClub ? (
          <img src={`/club-img/${postId}.jpg`} alt={`club${postId}`} />
        ) : (
          <img src={`/club-img/conf${postId}.jpg`} alt={`conf${postId}`} />
        )}
      </div>
    </div>
  );
}
