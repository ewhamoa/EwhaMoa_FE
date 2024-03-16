import { useState, useEffect } from 'react';
import { PostItem } from '../posts';
import axios from 'axios';

export function MyPosts() {
  const [posts, setPosts] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('/user/posts');
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  });

  return (
    <div id="item-wrap">
      <div id="items">
        {posts.data === undefined ? (
          <div id="load">
            <img src="/loading.gif" />
          </div>
        ) : posts.length !== 0 ? (
          posts?.map(({ postId, title, body, createdAt, due, isClub }) => (
            <PostItem
              key={postId}
              postId={postId}
              title={title}
              body={body}
              createdAt={createdAt}
              due={due}
              link={null}
              isClub={isClub}
              isChatbot={false}
            />
          ))
        ) : (
          <h1 id="inner-wrap" style={{ color: 'darkgreen' }}>
            아직 게시글이 없습니다.
          </h1>
        )}
      </div>
    </div>
  );
}
