import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

          setPosts(response);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    }

    fetchPosts();
  }, [isClub, postId, posts.postId]);

  return (
    <div>
      <div className="align-column">
        <div className="align-row">
          <div className="align-column" id="category">
            <h3>{posts.title}</h3>
            <p>{posts.groupName}</p>
            <p>|</p>
            <p>{posts.affiliationType}</p>
            <p>|</p>
            <p>{isClub ? '동아리' : '학회'}</p>
            <p>|</p>
            <p>{posts.grade}</p>
            <p>|</p>
            <p>{posts.topic}</p>
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
    </div>
  );
}
